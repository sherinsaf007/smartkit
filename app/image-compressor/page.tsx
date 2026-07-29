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

type CompressedImage = {
  blob: Blob;
  url: string;
  fileName: string;
  width: number;
  height: number;
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function ImageCompressor() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState("");
  const [compressedImage, setCompressedImage] =
    useState<CompressedImage | null>(null);

  const [quality, setQuality] = useState(75);
  const [outputFormat, setOutputFormat] = useState<
    "image/jpeg" | "image/webp" | "image/png"
  >("image/jpeg");

  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }

      if (compressedImage?.url) {
        URL.revokeObjectURL(compressedImage.url);
      }
    };
  }, [originalPreview, compressedImage]);

  function selectFile() {
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

  function loadFile(file: File) {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

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

    if (compressedImage?.url) {
      URL.revokeObjectURL(compressedImage.url);
    }

    const previewUrl = URL.createObjectURL(file);

    setOriginalFile(file);
    setOriginalPreview(previewUrl);
    setCompressedImage(null);

    if (file.type === "image/png") {
      setOutputFormat("image/png");
    } else if (file.type === "image/webp") {
      setOutputFormat("image/webp");
    } else {
      setOutputFormat("image/jpeg");
    }
  }

  async function compressImage() {
    if (!originalFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsCompressing(true);
    setError("");

    try {
      const image = await loadImage(originalPreview);

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not supported in this browser.");
      }

      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressionQuality =
        outputFormat === "image/png" ? undefined : quality / 100;

      const blob = await canvasToBlob(
        canvas,
        outputFormat,
        compressionQuality
      );

      if (compressedImage?.url) {
        URL.revokeObjectURL(compressedImage.url);
      }

      const compressedUrl = URL.createObjectURL(blob);

      setCompressedImage({
        blob,
        url: compressedUrl,
        fileName: createOutputFileName(
          originalFile.name,
          outputFormat
        ),
        width: canvas.width,
        height: canvas.height,
      });
    } catch {
      setError(
        "The image could not be compressed. Please try another file."
      );
    } finally {
      setIsCompressing(false);
    }
  }

  function downloadImage() {
    if (!compressedImage) {
      return;
    }

    const link = document.createElement("a");
    link.href = compressedImage.url;
    link.download = compressedImage.fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function resetTool() {
    if (originalPreview) {
      URL.revokeObjectURL(originalPreview);
    }

    if (compressedImage?.url) {
      URL.revokeObjectURL(compressedImage.url);
    }

    setOriginalFile(null);
    setOriginalPreview("");
    setCompressedImage(null);
    setQuality(75);
    setOutputFormat("image/jpeg");
    setError("");
    setIsDragging(false);
  }

  const savedBytes =
    originalFile && compressedImage
      ? originalFile.size - compressedImage.blob.size
      : 0;

  const savingsPercentage =
    originalFile && compressedImage && originalFile.size > 0
      ? (savedBytes / originalFile.size) * 100
      : 0;

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
            maxWidth: "950px",
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
              Image Compressor
            </h1>

            <p
              style={{
                margin: "0 auto",
                maxWidth: "680px",
                color: "#666",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              Compress JPG, PNG and WebP images directly in your
              browser without uploading them to a server.
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
                onClick={selectFile}
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
                    selectFile();
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
                  🖼️
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
                    color: "#666",
                    margin: "0 0 20px",
                    lineHeight: 1.6,
                  }}
                >
                  Drag and drop your image here, or click to select
                  a file.
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
                    color: "#888",
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
                      "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <PreviewCard
                    title="Original Image"
                    imageUrl={originalPreview}
                    fileSize={originalFile.size}
                  />

                  <PreviewCard
                    title="Compressed Image"
                    imageUrl={compressedImage?.url ?? ""}
                    fileSize={compressedImage?.blob.size}
                    placeholder="Your compressed image will appear here."
                  />
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      Compression quality: {quality}%
                    </label>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={quality}
                      disabled={outputFormat === "image/png"}
                      onChange={(event) =>
                        setQuality(Number(event.target.value))
                      }
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
                          color: "#888",
                          fontSize: "13px",
                        }}
                      >
                        Browser PNG export does not support adjustable
                        quality.
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Output format
                    </label>

                    <select
                      value={outputFormat}
                      onChange={(event) =>
                        setOutputFormat(
                          event.target.value as
                            | "image/jpeg"
                            | "image/webp"
                            | "image/png"
                        )
                      }
                      style={selectStyle}
                    >
                      <option value="image/jpeg">JPG</option>
                      <option value="image/webp">WebP</option>
                      <option value="image/png">PNG</option>
                    </select>
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
                    onClick={compressImage}
                    disabled={isCompressing}
                    style={{
                      ...primaryButton,
                      opacity: isCompressing ? 0.7 : 1,
                    }}
                  >
                    {isCompressing
                      ? "Compressing..."
                      : "Compress Image"}
                  </button>

                  {compressedImage && (
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

                {compressedImage && (
                  <div
                    style={{
                      marginTop: "30px",
                      background: "#F8FFF6",
                      border: "1px solid #D8EBD3",
                      borderRadius: "14px",
                      padding: "22px",
                    }}
                  >
                    <h2
                      style={{
                        margin: "0 0 18px",
                        color: "#0D530E",
                        fontSize: "22px",
                      }}
                    >
                      Compression Summary
                    </h2>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      <SummaryItem
                        label="Original size"
                        value={formatFileSize(originalFile.size)}
                      />

                      <SummaryItem
                        label="Compressed size"
                        value={formatFileSize(
                          compressedImage.blob.size
                        )}
                      />

                      <SummaryItem
                        label="Size reduction"
                        value={
                          savedBytes > 0
                            ? `${savingsPercentage.toFixed(1)}%`
                            : "0%"
                        }
                      />

                      <SummaryItem
                        label="Dimensions"
                        value={`${compressedImage.width} × ${compressedImage.height}`}
                      />
                    </div>

                    {savedBytes <= 0 && (
                      <p
                        style={{
                          margin: "18px 0 0",
                          color: "#8A5A00",
                          lineHeight: 1.6,
                        }}
                      >
                        The compressed file is not smaller. Try a
                        lower quality or choose WebP or JPG.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileInput}
              style={{ display: "none" }}
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
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "25px",
              marginTop: "25px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                color: "#0D530E",
                margin: "0 0 12px",
              }}
            >
              Private browser-based compression
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Your image is processed locally inside your browser.
              SmartKit does not send the selected image to a remote
              server.
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
  fileSize,
  placeholder,
}: {
  title: string;
  imageUrl: string;
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
          height: "280px",
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
              color: "#888",
              textAlign: "center",
              lineHeight: 1.6,
              padding: "20px",
            }}
          >
            {placeholder}
          </p>
        )}
      </div>

      {typeof fileSize === "number" && (
        <p
          style={{
            margin: "10px 0 0",
            color: "#666",
            fontSize: "14px",
          }}
        >
          File size: <strong>{formatFileSize(fileSize)}</strong>
        </p>
      )}
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "14px",
      }}
    >
      <div
        style={{
          color: "#777",
          fontSize: "13px",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#0D530E",
          fontWeight: 700,
          fontSize: "17px",
        }}
      >
        {value}
      </div>
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
          reject(new Error("Image compression failed"));
        }
      },
      type,
      quality
    );
  });
}

function createOutputFileName(
  originalName: string,
  outputFormat: string
) {
  const baseName =
    originalName.replace(/\.[^/.]+$/, "") || "image";

  const extension =
    outputFormat === "image/webp"
      ? "webp"
      : outputFormat === "image/png"
        ? "png"
        : "jpg";

  return `${baseName}-compressed.${extension}`;
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
  color: "#333",
  fontWeight: 700,
  fontSize: "15px",
};

const selectStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "10px",
  border: "1px solid #D4DDD1",
  borderRadius: "10px",
  background: "#FFFFFF",
  fontSize: "15px",
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