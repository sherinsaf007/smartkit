"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

type ResizedImage = {
  blob: Blob;
  url: string;
  fileName: string;
  width: number;
  height: number;
};

type ImageDimensions = {
  width: number;
  height: number;
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const presets = [
  {
    label: "Instagram Post",
    width: 1080,
    height: 1080,
  },
  {
    label: "Instagram Story",
    width: 1080,
    height: 1920,
  },
  {
    label: "Facebook Post",
    width: 1200,
    height: 630,
  },
  {
    label: "YouTube Thumbnail",
    width: 1280,
    height: 720,
  },
  {
    label: "LinkedIn Post",
    width: 1200,
    height: 627,
  },
  {
    label: "Passport Photo",
    width: 600,
    height: 600,
  },
];

export default function ImageResizer() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState("");
  const [originalDimensions, setOriginalDimensions] =
    useState<ImageDimensions>({
      width: 0,
      height: 0,
    });

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);

  const [resizedImage, setResizedImage] =
    useState<ResizedImage | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }

      if (resizedImage?.url) {
        URL.revokeObjectURL(resizedImage.url);
      }
    };
  }, [originalPreview, resizedImage]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      loadFile(file);
    }

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      loadFile(file);
    }
  }

  async function loadFile(file: File) {
    setError("");

    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!supportedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are supported.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Please upload an image smaller than 20 MB.");
      return;
    }

    if (originalPreview) {
      URL.revokeObjectURL(originalPreview);
    }

    if (resizedImage?.url) {
      URL.revokeObjectURL(resizedImage.url);
    }

    const previewUrl = URL.createObjectURL(file);

    try {
      const image = await loadImage(previewUrl);

      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const ratio = imageWidth / imageHeight;

      setOriginalFile(file);
      setOriginalPreview(previewUrl);
      setOriginalDimensions({
        width: imageWidth,
        height: imageHeight,
      });

      setWidth(imageWidth);
      setHeight(imageHeight);
      setAspectRatio(ratio);
      setResizedImage(null);

      if (file.type === "image/png") {
        setOutputFormat("image/png");
      } else if (file.type === "image/webp") {
        setOutputFormat("image/webp");
      } else {
        setOutputFormat("image/jpeg");
      }
    } catch {
      URL.revokeObjectURL(previewUrl);
      setError("The selected image could not be loaded.");
    }
  }

  function handleWidthChange(value: number) {
    const safeWidth = Math.max(1, value);
    setWidth(safeWidth);

    if (lockAspectRatio && aspectRatio > 0) {
      setHeight(Math.max(1, Math.round(safeWidth / aspectRatio)));
    }

    setResizedImage(null);
  }

  function handleHeightChange(value: number) {
    const safeHeight = Math.max(1, value);
    setHeight(safeHeight);

    if (lockAspectRatio && aspectRatio > 0) {
      setWidth(Math.max(1, Math.round(safeHeight * aspectRatio)));
    }

    setResizedImage(null);
  }

  function applyPreset(presetWidth: number, presetHeight: number) {
    setWidth(presetWidth);
    setHeight(presetHeight);
    setLockAspectRatio(false);
    setResizedImage(null);
    setError("");
  }

  function resetDimensions() {
    if (!originalFile) {
      return;
    }

    setWidth(originalDimensions.width);
    setHeight(originalDimensions.height);
    setAspectRatio(
      originalDimensions.width / originalDimensions.height
    );
    setLockAspectRatio(true);
    setResizedImage(null);
    setError("");
  }

  async function resizeImage() {
    if (!originalFile || !originalPreview) {
      setError("Please upload an image first.");
      return;
    }

    if (width < 1 || height < 1) {
      setError("Width and height must be greater than zero.");
      return;
    }

    if (width > 10000 || height > 10000) {
      setError("Maximum supported dimension is 10,000 pixels.");
      return;
    }

    setIsResizing(true);
    setError("");

    try {
      const image = await loadImage(originalPreview);
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is unavailable.");
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, width, height);
      }

      context.drawImage(image, 0, 0, width, height);

      const outputQuality =
        outputFormat === "image/png" ? undefined : quality / 100;

      const blob = await canvasToBlob(
        canvas,
        outputFormat,
        outputQuality
      );

      if (resizedImage?.url) {
        URL.revokeObjectURL(resizedImage.url);
      }

      const resizedUrl = URL.createObjectURL(blob);

      setResizedImage({
        blob,
        url: resizedUrl,
        fileName: createOutputFileName(
          originalFile.name,
          outputFormat
        ),
        width,
        height,
      });
    } catch {
      setError(
        "The image could not be resized. Please try another image."
      );
    } finally {
      setIsResizing(false);
    }
  }

  function downloadImage() {
    if (!resizedImage) {
      return;
    }

    const link = document.createElement("a");
    link.href = resizedImage.url;
    link.download = resizedImage.fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function resetTool() {
    if (originalPreview) {
      URL.revokeObjectURL(originalPreview);
    }

    if (resizedImage?.url) {
      URL.revokeObjectURL(resizedImage.url);
    }

    setOriginalFile(null);
    setOriginalPreview("");
    setOriginalDimensions({
      width: 0,
      height: 0,
    });

    setWidth(0);
    setHeight(0);
    setAspectRatio(1);
    setLockAspectRatio(true);
    setOutputFormat("image/jpeg");
    setQuality(90);
    setResizedImage(null);
    setError("");
    setIsDragging(false);
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#FBF5DD",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <header
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                margin: "0 0 12px",
                color: "#0D530E",
                fontSize: "clamp(30px, 5vw, 44px)",
              }}
            >
              Image Resizer
            </h1>

            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "#666666",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              Resize JPG, PNG and WebP images by entering custom
              dimensions or selecting a popular social-media preset.
            </p>
          </header>

          <section
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "clamp(20px, 4vw, 35px)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.08)",
            }}
          >
            {!originalFile ? (
              <div
                onClick={openFilePicker}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    openFilePicker();
                  }
                }}
                style={{
                  border: isDragging
                    ? "2px solid #0D530E"
                    : "2px dashed #AFC8A8",
                  borderRadius: "16px",
                  padding: "55px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: isDragging
                    ? "#F0F8ED"
                    : "#F8FFF6",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "52px",
                    marginBottom: "15px",
                  }}
                >
                  📐
                </div>

                <h2
                  style={{
                    color: "#0D530E",
                    margin: "0 0 10px",
                  }}
                >
                  Upload an image
                </h2>

                <p
                  style={{
                    color: "#666666",
                    margin: "0 0 20px",
                    lineHeight: 1.6,
                  }}
                >
                  Drag and drop an image here, or click to choose a
                  file.
                </p>

                <span
                  style={{
                    display: "inline-block",
                    background: "#0D530E",
                    color: "#FFFFFF",
                    padding: "13px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                  }}
                >
                  Choose Image
                </span>

                <p
                  style={{
                    margin: "18px 0 0",
                    color: "#888888",
                    fontSize: "13px",
                  }}
                >
                  JPG, PNG or WebP · Maximum 20 MB
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <PreviewCard
                    title="Original Image"
                    imageUrl={originalPreview}
                    width={originalDimensions.width}
                    height={originalDimensions.height}
                    fileSize={originalFile.size}
                  />

                  <PreviewCard
                    title="Resized Image"
                    imageUrl={resizedImage?.url ?? ""}
                    width={resizedImage?.width}
                    height={resizedImage?.height}
                    fileSize={resizedImage?.blob.size}
                    placeholder="The resized image will appear here."
                  />
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    padding: "24px",
                    background: "#F8FFF6",
                    border: "1px solid #D8EBD3",
                    borderRadius: "16px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 20px",
                      color: "#0D530E",
                      fontSize: "22px",
                    }}
                  >
                    Resize Settings
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "18px",
                    }}
                  >
                    <div>
                      <label style={labelStyle} htmlFor="image-width">
                        Width in pixels
                      </label>

                      <input
                        id="image-width"
                        type="number"
                        min="1"
                        max="10000"
                        value={width}
                        onChange={(event) =>
                          handleWidthChange(
                            Number(event.target.value)
                          )
                        }
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        style={labelStyle}
                        htmlFor="image-height"
                      >
                        Height in pixels
                      </label>

                      <input
                        id="image-height"
                        type="number"
                        min="1"
                        max="10000"
                        value={height}
                        onChange={(event) =>
                          handleHeightChange(
                            Number(event.target.value)
                          )
                        }
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        style={labelStyle}
                        htmlFor="output-format"
                      >
                        Output format
                      </label>

                      <select
                        id="output-format"
                        value={outputFormat}
                        onChange={(event) => {
                          setOutputFormat(
                            event.target.value as OutputFormat
                          );
                          setResizedImage(null);
                        }}
                        style={inputStyle}
                      >
                        <option value="image/jpeg">JPG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      id="aspect-ratio"
                      type="checkbox"
                      checked={lockAspectRatio}
                      onChange={(event) =>
                        setLockAspectRatio(event.target.checked)
                      }
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />

                    <label
                      htmlFor="aspect-ratio"
                      style={{
                        color: "#333333",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Lock aspect ratio
                    </label>

                    <button
                      type="button"
                      onClick={resetDimensions}
                      style={smallButton}
                    >
                      Reset Original Size
                    </button>
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                    }}
                  >
                    <label style={labelStyle}>
                      Image quality: {quality}%
                    </label>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={quality}
                      disabled={outputFormat === "image/png"}
                      onChange={(event) => {
                        setQuality(Number(event.target.value));
                        setResizedImage(null);
                      }}
                      style={{
                        width: "100%",
                        marginTop: "14px",
                        cursor:
                          outputFormat === "image/png"
                            ? "not-allowed"
                            : "pointer",
                      }}
                    />

                    {outputFormat === "image/png" && (
                      <p
                        style={{
                          margin: "8px 0 0",
                          color: "#888888",
                          fontSize: "13px",
                        }}
                      >
                        PNG quality cannot be adjusted by the browser.
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "26px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 15px",
                      color: "#0D530E",
                      fontSize: "21px",
                    }}
                  >
                    Popular Size Presets
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() =>
                          applyPreset(preset.width, preset.height)
                        }
                        style={presetButton}
                      >
                        <span
                          style={{
                            display: "block",
                            fontWeight: 700,
                            marginBottom: "5px",
                          }}
                        >
                          {preset.label}
                        </span>

                        <span
                          style={{
                            fontSize: "13px",
                            opacity: 0.8,
                          }}
                        >
                          {preset.width} × {preset.height}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginTop: "30px",
                  }}
                >
                  <button
                    type="button"
                    onClick={resizeImage}
                    disabled={isResizing}
                    style={{
                      ...primaryButton,
                      opacity: isResizing ? 0.7 : 1,
                    }}
                  >
                    {isResizing
                      ? "Resizing..."
                      : "Resize Image"}
                  </button>

                  {resizedImage && (
                    <button
                      type="button"
                      onClick={downloadImage}
                      style={downloadButton}
                    >
                      Download Image
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={resetTool}
                    style={secondaryButton}
                  >
                    Upload Another
                  </button>
                </div>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
              style={{
                display: "none",
              }}
            />

            {error && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #FFD1D1",
                  background: "#FFF1F1",
                  color: "#B42318",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
          </section>

          <section
            style={{
              marginTop: "25px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                color: "#0D530E",
              }}
            >
              Resize images privately
            </h2>

            <p
              style={{
                margin: 0,
                color: "#666666",
                lineHeight: 1.7,
              }}
            >
              Your image is processed locally in your browser. It is
              not uploaded to a remote server, helping keep your files
              private.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PreviewCard({
  title,
  imageUrl,
  width,
  height,
  fileSize,
  placeholder,
}: {
  title: string;
  imageUrl: string;
  width?: number;
  height?: number;
  fileSize?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <h2
        style={{
          color: "#0D530E",
          fontSize: "19px",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          height: "300px",
          border: "1px solid #DDE6DA",
          borderRadius: "14px",
          background: "#F7F8F6",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <p
            style={{
              margin: 0,
              color: "#888888",
              textAlign: "center",
              lineHeight: 1.6,
              padding: "20px",
            }}
          >
            {placeholder}
          </p>
        )}
      </div>

      {(width || height || typeof fileSize === "number") && (
        <div
          style={{
            marginTop: "10px",
            color: "#666666",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          {width && height ? (
            <div>
              Dimensions:{" "}
              <strong>
                {width} × {height} px
              </strong>
            </div>
          ) : null}

          {typeof fileSize === "number" && (
            <div>
              File size: <strong>{formatFileSize(fileSize)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image loading failed"));
    image.src = source;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Image resizing failed"));
        }
      },
      type,
      quality
    );
  });
}

function createOutputFileName(
  originalName: string,
  outputFormat: OutputFormat
) {
  const baseName =
    originalName.replace(/\.[^/.]+$/, "") || "image";

  const extension =
    outputFormat === "image/webp"
      ? "webp"
      : outputFormat === "image/png"
        ? "png"
        : "jpg";

  return `${baseName}-resized.${extension}`;
}

function formatFileSize(bytes: number) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, unitIndex);

  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${
    units[unitIndex]
  }`;
}

const labelStyle = {
  display: "block",
  color: "#333333",
  fontWeight: 700,
  fontSize: "15px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px",
  marginTop: "10px",
  border: "1px solid #D4DDD1",
  borderRadius: "10px",
  background: "#FFFFFF",
  fontSize: "15px",
};

const smallButton = {
  marginLeft: "auto",
  padding: "9px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#EAF4E7",
  color: "#0D530E",
  cursor: "pointer",
  fontWeight: 700,
};

const presetButton = {
  padding: "15px 10px",
  border: "1px solid #D8EBD3",
  borderRadius: "10px",
  background: "#F8FFF6",
  color: "#0D530E",
  cursor: "pointer",
  textAlign: "center" as const,
};

const primaryButton = {
  flex: "1 1 190px",
  padding: "14px 20px",
  background: "#0D530E",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "15px",
};

const downloadButton = {
  flex: "1 1 190px",
  padding: "14px 20px",
  background: "#E7E1B1",
  color: "#0D530E",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "15px",
};

const secondaryButton = {
  flex: "1 1 190px",
  padding: "14px 20px",
  background: "#EEF1EC",
  color: "#333333",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "15px",
};