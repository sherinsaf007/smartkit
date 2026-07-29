"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type PageSize = "a4" | "letter" | "fit";
type Orientation = "portrait" | "landscape";

type SelectedImage = {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_IMAGES = 30;

const supportedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<SelectedImage[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] =
    useState<Orientation>("portrait");
  const [margin, setMargin] = useState(10);
  const [fileName, setFileName] = useState("smartkit-images");

  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const imagesRef = useRef<SelectedImage[]>([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, []);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileInput(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      await addFiles(files);
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

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files ?? []);

    if (files.length > 0) {
      await addFiles(files);
    }
  }

  async function addFiles(files: File[]) {
    setError("");

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setError(`You can add up to ${MAX_IMAGES} images.`);
      return;
    }

    const acceptedFiles = files.slice(0, remainingSlots);
    const validImages: SelectedImage[] = [];
    const rejectedMessages: string[] = [];

    for (const file of acceptedFiles) {
      if (!supportedTypes.includes(file.type)) {
        rejectedMessages.push(
          `${file.name}: unsupported file format.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        rejectedMessages.push(
          `${file.name}: file is larger than 20 MB.`
        );
        continue;
      }

      const url = URL.createObjectURL(file);

      try {
        const image = await loadImage(url);

        validImages.push({
          id: createImageId(),
          file,
          url,
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      } catch {
        URL.revokeObjectURL(url);

        rejectedMessages.push(
          `${file.name}: image could not be loaded.`
        );
      }
    }

    if (files.length > remainingSlots) {
      rejectedMessages.push(
        `Only ${remainingSlots} additional image${
          remainingSlots === 1 ? "" : "s"
        } could be added.`
      );
    }

    if (validImages.length > 0) {
      setImages((previous) => [...previous, ...validImages]);
    }

    if (rejectedMessages.length > 0) {
      setError(rejectedMessages.join(" "));
    }
  }

  function removeImage(id: string) {
    setImages((previous) => {
      const imageToRemove = previous.find(
        (image) => image.id === id
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return previous.filter((image) => image.id !== id);
    });

    setError("");
  }

  function moveImage(index: number, direction: "up" | "down") {
    setImages((previous) => {
      const newIndex =
        direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= previous.length) {
        return previous;
      }

      const updatedImages = [...previous];
      const currentImage = updatedImages[index];

      updatedImages[index] = updatedImages[newIndex];
      updatedImages[newIndex] = currentImage;

      return updatedImages;
    });
  }

  function clearAllImages() {
    images.forEach((image) => {
      URL.revokeObjectURL(image.url);
    });

    setImages([]);
    setError("");
  }

  async function generatePdf() {
    if (images.length === 0) {
      setError("Please add at least one image.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const { jsPDF } = await import("jspdf");

      let pdf: InstanceType<typeof jsPDF> | null = null;

      for (let index = 0; index < images.length; index += 1) {
        const selectedImage = images[index];

        const pageDimensions = getPageDimensions(
          pageSize,
          orientation,
          selectedImage.width,
          selectedImage.height
        );

        const pageOrientation: Orientation =
          pageDimensions.width > pageDimensions.height
            ? "landscape"
            : "portrait";

        if (!pdf) {
          pdf = new jsPDF({
            orientation: pageOrientation,
            unit: "mm",
            format: [
              pageDimensions.width,
              pageDimensions.height,
            ],
            compress: true,
          });
        } else {
          pdf.addPage(
            [pageDimensions.width, pageDimensions.height],
            pageOrientation
          );
        }

        const safeMargin = Math.min(
          margin,
          pageDimensions.width / 4,
          pageDimensions.height / 4
        );

        const availableWidth =
          pageDimensions.width - safeMargin * 2;

        const availableHeight =
          pageDimensions.height - safeMargin * 2;

        const imageRatio =
          selectedImage.width / selectedImage.height;

        const availableRatio =
          availableWidth / availableHeight;

        let renderedWidth: number;
        let renderedHeight: number;

        if (imageRatio > availableRatio) {
          renderedWidth = availableWidth;
          renderedHeight = renderedWidth / imageRatio;
        } else {
          renderedHeight = availableHeight;
          renderedWidth = renderedHeight * imageRatio;
        }

        const xPosition =
          (pageDimensions.width - renderedWidth) / 2;

        const yPosition =
          (pageDimensions.height - renderedHeight) / 2;

        const imageData = await imageToJpegDataUrl(
          selectedImage.url
        );

        pdf.addImage(
          imageData,
          "JPEG",
          xPosition,
          yPosition,
          renderedWidth,
          renderedHeight,
          undefined,
          "FAST"
        );
      }

      if (!pdf) {
        throw new Error("PDF could not be created.");
      }

      const safeFileName =
        fileName.trim().replace(/[<>:"/\\|?*]+/g, "-") ||
        "smartkit-images";

      pdf.save(
        safeFileName.toLowerCase().endsWith(".pdf")
          ? safeFileName
          : `${safeFileName}.pdf`
      );
    } catch {
      setError(
        "The PDF could not be generated. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  const totalFileSize = images.reduce(
    (total, image) => total + image.file.size,
    0
  );

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
            maxWidth: "1050px",
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
              Image to PDF
            </h1>

            <p
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                color: "#666666",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              Convert multiple JPG, PNG and WebP images into one
              downloadable PDF document.
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
                padding: "42px 20px",
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
                  fontSize: "50px",
                  marginBottom: "12px",
                }}
              >
                📄
              </div>

              <h2
                style={{
                  margin: "0 0 10px",
                  color: "#0D530E",
                }}
              >
                Add images
              </h2>

              <p
                style={{
                  margin: "0 0 20px",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                Drag and drop your images here, or click to select
                multiple files.
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "13px 24px",
                  borderRadius: "10px",
                  background: "#0D530E",
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                Choose Images
              </span>

              <p
                style={{
                  margin: "18px 0 0",
                  color: "#888888",
                  fontSize: "13px",
                }}
              >
                JPG, PNG or WebP · Maximum 20 MB each · Up to{" "}
                {MAX_IMAGES} images
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileInput}
              style={{
                display: "none",
              }}
            />

            {images.length > 0 && (
              <>
                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "0 0 5px",
                        color: "#0D530E",
                        fontSize: "22px",
                      }}
                    >
                      Selected Images
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#777777",
                        fontSize: "14px",
                      }}
                    >
                      {images.length} image
                      {images.length === 1 ? "" : "s"} ·{" "}
                      {formatFileSize(totalFileSize)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearAllImages}
                    style={dangerButton}
                  >
                    Remove All
                  </button>
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  {images.map((image, index) => (
                    <ImageItem
                      key={image.id}
                      image={image}
                      index={index}
                      totalImages={images.length}
                      onMove={moveImage}
                      onRemove={removeImage}
                    />
                  ))}
                </div>

                <section
                  style={{
                    marginTop: "30px",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid #D8EBD3",
                    background: "#F8FFF6",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 20px",
                      color: "#0D530E",
                      fontSize: "22px",
                    }}
                  >
                    PDF Settings
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
                      <label
                        htmlFor="page-size"
                        style={labelStyle}
                      >
                        Page size
                      </label>

                      <select
                        id="page-size"
                        value={pageSize}
                        onChange={(event) =>
                          setPageSize(
                            event.target.value as PageSize
                          )
                        }
                        style={inputStyle}
                      >
                        <option value="a4">A4</option>
                        <option value="letter">US Letter</option>
                        <option value="fit">
                          Fit page to image
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="orientation"
                        style={labelStyle}
                      >
                        Orientation
                      </label>

                      <select
                        id="orientation"
                        value={orientation}
                        disabled={pageSize === "fit"}
                        onChange={(event) =>
                          setOrientation(
                            event.target
                              .value as Orientation
                          )
                        }
                        style={{
                          ...inputStyle,
                          opacity: pageSize === "fit" ? 0.6 : 1,
                          cursor:
                            pageSize === "fit"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        <option value="portrait">
                          Portrait
                        </option>

                        <option value="landscape">
                          Landscape
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="page-margin"
                        style={labelStyle}
                      >
                        Page margin
                      </label>

                      <select
                        id="page-margin"
                        value={margin}
                        onChange={(event) =>
                          setMargin(Number(event.target.value))
                        }
                        style={inputStyle}
                      >
                        <option value={0}>No margin</option>
                        <option value={5}>Small – 5 mm</option>
                        <option value={10}>
                          Normal – 10 mm
                        </option>
                        <option value={15}>
                          Large – 15 mm
                        </option>
                        <option value={20}>
                          Extra large – 20 mm
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="pdf-file-name"
                        style={labelStyle}
                      >
                        PDF file name
                      </label>

                      <input
                        id="pdf-file-name"
                        type="text"
                        value={fileName}
                        maxLength={80}
                        onChange={(event) =>
                          setFileName(event.target.value)
                        }
                        placeholder="smartkit-images"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </section>

                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={generatePdf}
                    disabled={isGenerating}
                    style={{
                      ...primaryButton,
                      opacity: isGenerating ? 0.7 : 1,
                    }}
                  >
                    {isGenerating
                      ? "Creating PDF..."
                      : `Create PDF (${images.length} Page${
                          images.length === 1 ? "" : "s"
                        })`}
                  </button>

                  <button
                    type="button"
                    onClick={openFilePicker}
                    style={secondaryButton}
                  >
                    Add More Images
                  </button>
                </div>
              </>
            )}

            {error && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #FFD1D1",
                  background: "#FFF1F1",
                  color: "#B42318",
                  lineHeight: 1.6,
                }}
              >
                {error}
              </div>
            )}
          </section>

          <section
            style={{
              marginTop: "25px",
              padding: "25px",
              borderRadius: "16px",
              background: "#FFFFFF",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                color: "#0D530E",
              }}
            >
              Private image-to-PDF conversion
            </h2>

            <p
              style={{
                margin: 0,
                color: "#666666",
                lineHeight: 1.7,
              }}
            >
              Your images are processed locally inside your browser.
              They are not uploaded to SmartKit or sent to a remote
              server.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function ImageItem({
  image,
  index,
  totalImages,
  onMove,
  onRemove,
}: {
  image: SelectedImage;
  index: number;
  totalImages: number;
  onMove: (index: number, direction: "up" | "down") => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "90px minmax(0, 1fr) auto",
        alignItems: "center",
        gap: "16px",
        padding: "14px",
        border: "1px solid #E1E7DE",
        borderRadius: "14px",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "75px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "#F1F3EE",
        }}
      >
        <img
          src={image.url}
          alt={image.file.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          minWidth: 0,
        }}
      >
        <div
          style={{
            color: "#222222",
            fontWeight: 700,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {index + 1}. {image.file.name}
        </div>

        <div
          style={{
            marginTop: "6px",
            color: "#777777",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {image.width} × {image.height} px ·{" "}
          {formatFileSize(image.file.size)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => onMove(index, "up")}
          disabled={index === 0}
          aria-label={`Move ${image.file.name} up`}
          style={{
            ...iconButton,
            opacity: index === 0 ? 0.4 : 1,
          }}
        >
          ↑
        </button>

        <button
          type="button"
          onClick={() => onMove(index, "down")}
          disabled={index === totalImages - 1}
          aria-label={`Move ${image.file.name} down`}
          style={{
            ...iconButton,
            opacity:
              index === totalImages - 1 ? 0.4 : 1,
          }}
        >
          ↓
        </button>

        <button
          type="button"
          onClick={() => onRemove(image.id)}
          aria-label={`Remove ${image.file.name}`}
          style={removeButton}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function getPageDimensions(
  pageSize: PageSize,
  orientation: Orientation,
  imageWidth: number,
  imageHeight: number
) {
  if (pageSize === "fit") {
    const maximumSide = 297;
    const ratio = imageWidth / imageHeight;

    if (ratio >= 1) {
      return {
        width: maximumSide,
        height: Math.max(20, maximumSide / ratio),
      };
    }

    return {
      width: Math.max(20, maximumSide * ratio),
      height: maximumSide,
    };
  }

  const dimensions =
    pageSize === "letter"
      ? {
          width: 215.9,
          height: 279.4,
        }
      : {
          width: 210,
          height: 297,
        };

  if (orientation === "landscape") {
    return {
      width: dimensions.height,
      height: dimensions.width,
    };
  }

  return dimensions;
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Image could not be loaded."));
    image.src = source;
  });
}

async function imageToJpegDataUrl(source: string) {
  const image = await loadImage(source);
  const canvas = document.createElement("canvas");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is unavailable.");
  }

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(image, 0, 0);

  return canvas.toDataURL("image/jpeg", 0.92);
}

function createImageId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
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
  fontSize: "15px",
  fontWeight: 700,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  marginTop: "10px",
  padding: "13px",
  border: "1px solid #D4DDD1",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#222222",
  fontSize: "15px",
};

const iconButton = {
  width: "36px",
  height: "36px",
  border: "none",
  borderRadius: "8px",
  background: "#EAF4E7",
  color: "#0D530E",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 700,
};

const removeButton = {
  padding: "10px 12px",
  border: "none",
  borderRadius: "8px",
  background: "#FFE8E8",
  color: "#B42318",
  cursor: "pointer",
  fontWeight: 700,
};

const dangerButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "9px",
  background: "#FFE8E8",
  color: "#B42318",
  cursor: "pointer",
  fontWeight: 700,
};

const primaryButton = {
  flex: "1 1 220px",
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#0D530E",
  color: "#FFFFFF",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 700,
};

const secondaryButton = {
  flex: "1 1 180px",
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#EEF1EC",
  color: "#333333",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: 700,
};