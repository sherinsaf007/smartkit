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

type SelectedPdf = {
  id: string;
  file: File;
  pageCount: number;
};

const MAX_FILES = 20;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function PdfMerge() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pdfFiles, setPdfFiles] = useState<SelectedPdf[]>([]);
  const [outputFileName, setOutputFileName] =
    useState("smartkit-merged-pdf");

  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileInput(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      await addPdfFiles(files);
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
      await addPdfFiles(files);
    }
  }

  async function addPdfFiles(files: File[]) {
    setError("");

    const remainingSlots = MAX_FILES - pdfFiles.length;

    if (remainingSlots <= 0) {
      setError(`You can add up to ${MAX_FILES} PDF files.`);
      return;
    }

    setIsReading(true);

    const acceptedFiles = files.slice(0, remainingSlots);
    const validFiles: SelectedPdf[] = [];
    const rejectedMessages: string[] = [];

    try {
      const { PDFDocument } = await import("pdf-lib");

      for (const file of acceptedFiles) {
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
          rejectedMessages.push(
            `${file.name}: only PDF files are supported.`
          );
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          rejectedMessages.push(
            `${file.name}: file is larger than 50 MB.`
          );
          continue;
        }

        try {
          const fileBytes = await file.arrayBuffer();

          const pdfDocument = await PDFDocument.load(fileBytes);

          validFiles.push({
            id: createFileId(),
            file,
            pageCount: pdfDocument.getPageCount(),
          });
        } catch {
          rejectedMessages.push(
            `${file.name}: file could not be opened. It may be damaged or password-protected.`
          );
        }
      }

      if (files.length > remainingSlots) {
        rejectedMessages.push(
          `Only ${remainingSlots} additional file${
            remainingSlots === 1 ? "" : "s"
          } could be added.`
        );
      }

      if (validFiles.length > 0) {
        setPdfFiles((previousFiles) => [
          ...previousFiles,
          ...validFiles,
        ]);
      }

      if (rejectedMessages.length > 0) {
        setError(rejectedMessages.join(" "));
      }
    } catch {
      setError(
        "The PDF library could not be loaded. Please refresh the page and try again."
      );
    } finally {
      setIsReading(false);
    }
  }

  function removePdf(id: string) {
    setPdfFiles((previousFiles) =>
      previousFiles.filter((pdf) => pdf.id !== id)
    );

    setError("");
  }

  function movePdf(
    index: number,
    direction: "up" | "down"
  ) {
    setPdfFiles((previousFiles) => {
      const newIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        newIndex < 0 ||
        newIndex >= previousFiles.length
      ) {
        return previousFiles;
      }

      const reorderedFiles = [...previousFiles];

      [reorderedFiles[index], reorderedFiles[newIndex]] = [
        reorderedFiles[newIndex],
        reorderedFiles[index],
      ];

      return reorderedFiles;
    });
  }

  function clearAllFiles() {
    setPdfFiles([]);
    setError("");
  }

  async function mergePdfFiles() {
    if (pdfFiles.length < 2) {
      setError("Please add at least two PDF files to merge.");
      return;
    }

    setIsMerging(true);
    setError("");

    try {
      const { PDFDocument } = await import("pdf-lib");

      const mergedDocument = await PDFDocument.create();

      for (const selectedPdf of pdfFiles) {
        const fileBytes =
          await selectedPdf.file.arrayBuffer();

        const sourceDocument =
          await PDFDocument.load(fileBytes);

        const copiedPages = await mergedDocument.copyPages(
          sourceDocument,
          sourceDocument.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedDocument.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedDocument.save({
        useObjectStreams: true,
      });

      const pdfBlob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = createOutputFileName(outputFileName);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);
    } catch {
      setError(
        "The PDF files could not be merged. One of the files may be damaged or password-protected."
      );
    } finally {
      setIsMerging(false);
    }
  }

  const totalPages = pdfFiles.reduce(
    (total, pdf) => total + pdf.pageCount,
    0
  );

  const totalFileSize = pdfFiles.reduce(
    (total, pdf) => total + pdf.file.size,
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
              Merge PDF
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
              Combine multiple PDF documents into one file.
              Arrange the files in your preferred order before
              downloading the merged PDF.
            </p>
          </header>

          <section
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "clamp(20px, 4vw, 35px)",
              boxShadow:
                "0 12px 35px rgba(0, 0, 0, 0.08)",
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
                padding: "45px 20px",
                textAlign: "center",
                cursor: isReading
                  ? "wait"
                  : "pointer",
                background: isDragging
                  ? "#F0F8ED"
                  : "#F8FFF6",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  fontSize: "52px",
                  marginBottom: "12px",
                }}
              >
                📚
              </div>

              <h2
                style={{
                  margin: "0 0 10px",
                  color: "#0D530E",
                }}
              >
                {isReading
                  ? "Reading PDF files..."
                  : "Add PDF files"}
              </h2>

              <p
                style={{
                  margin: "0 0 20px",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                Drag and drop your PDF files here, or click to
                select multiple documents.
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "13px 24px",
                  borderRadius: "10px",
                  background: "#0D530E",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  opacity: isReading ? 0.7 : 1,
                }}
              >
                {isReading
                  ? "Processing..."
                  : "Choose PDF Files"}
              </span>

              <p
                style={{
                  margin: "18px 0 0",
                  color: "#888888",
                  fontSize: "13px",
                }}
              >
                Maximum 50 MB per file · Up to {MAX_FILES}{" "}
                files
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileInput}
              disabled={isReading || isMerging}
              style={{
                display: "none",
              }}
            />

            {pdfFiles.length > 0 && (
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
                      Selected PDF Files
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#777777",
                        fontSize: "14px",
                      }}
                    >
                      {pdfFiles.length} file
                      {pdfFiles.length === 1 ? "" : "s"} ·{" "}
                      {totalPages} page
                      {totalPages === 1 ? "" : "s"} ·{" "}
                      {formatFileSize(totalFileSize)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearAllFiles}
                    disabled={isMerging}
                    style={{
                      ...dangerButton,
                      opacity: isMerging ? 0.6 : 1,
                    }}
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
                  {pdfFiles.map((pdf, index) => (
                    <PdfFileItem
                      key={pdf.id}
                      pdf={pdf}
                      index={index}
                      totalFiles={pdfFiles.length}
                      disabled={isMerging}
                      onMove={movePdf}
                      onRemove={removePdf}
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
                    Output Settings
                  </h2>

                  <div>
                    <label
                      htmlFor="merged-file-name"
                      style={labelStyle}
                    >
                      Merged PDF file name
                    </label>

                    <input
                      id="merged-file-name"
                      type="text"
                      value={outputFileName}
                      maxLength={80}
                      disabled={isMerging}
                      onChange={(event) =>
                        setOutputFileName(
                          event.target.value
                        )
                      }
                      placeholder="smartkit-merged-pdf"
                      style={inputStyle}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "14px",
                      marginTop: "22px",
                    }}
                  >
                    <SummaryCard
                      label="PDF files"
                      value={pdfFiles.length.toString()}
                    />

                    <SummaryCard
                      label="Total pages"
                      value={totalPages.toString()}
                    />

                    <SummaryCard
                      label="Original size"
                      value={formatFileSize(totalFileSize)}
                    />
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
                    onClick={mergePdfFiles}
                    disabled={
                      isMerging ||
                      isReading ||
                      pdfFiles.length < 2
                    }
                    style={{
                      ...primaryButton,
                      opacity:
                        isMerging ||
                        isReading ||
                        pdfFiles.length < 2
                          ? 0.6
                          : 1,
                      cursor:
                        isMerging ||
                        isReading ||
                        pdfFiles.length < 2
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {isMerging
                      ? "Merging PDFs..."
                      : `Merge ${pdfFiles.length} PDF Files`}
                  </button>

                  <button
                    type="button"
                    onClick={openFilePicker}
                    disabled={isReading || isMerging}
                    style={{
                      ...secondaryButton,
                      opacity:
                        isReading || isMerging ? 0.6 : 1,
                    }}
                  >
                    Add More PDFs
                  </button>
                </div>

                {pdfFiles.length === 1 && (
                  <p
                    style={{
                      margin: "15px 0 0",
                      color: "#777777",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Add at least one more PDF file to begin
                    merging.
                  </p>
                )}
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
              boxShadow:
                "0 8px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                color: "#0D530E",
              }}
            >
              Merge PDFs privately
            </h2>

            <p
              style={{
                margin: 0,
                color: "#666666",
                lineHeight: 1.7,
              }}
            >
              Your PDF files are merged locally inside your
              browser. They are not uploaded to SmartKit or sent
              to a remote server.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PdfFileItem({
  pdf,
  index,
  totalFiles,
  disabled,
  onMove,
  onRemove,
}: {
  pdf: SelectedPdf;
  index: number;
  totalFiles: number;
  disabled: boolean;
  onMove: (
    index: number,
    direction: "up" | "down"
  ) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70px minmax(0, 1fr) auto",
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
          width: "70px",
          height: "70px",
          borderRadius: "12px",
          background: "#F2F8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
        }}
      >
        📄
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
          title={pdf.file.name}
        >
          {index + 1}. {pdf.file.name}
        </div>

        <div
          style={{
            marginTop: "6px",
            color: "#777777",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {pdf.pageCount} page
          {pdf.pageCount === 1 ? "" : "s"} ·{" "}
          {formatFileSize(pdf.file.size)}
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
          disabled={disabled || index === 0}
          aria-label={`Move ${pdf.file.name} up`}
          style={{
            ...iconButton,
            opacity:
              disabled || index === 0 ? 0.4 : 1,
          }}
        >
          ↑
        </button>

        <button
          type="button"
          onClick={() => onMove(index, "down")}
          disabled={
            disabled || index === totalFiles - 1
          }
          aria-label={`Move ${pdf.file.name} down`}
          style={{
            ...iconButton,
            opacity:
              disabled || index === totalFiles - 1
                ? 0.4
                : 1,
          }}
        >
          ↓
        </button>

        <button
          type="button"
          onClick={() => onRemove(pdf.id)}
          disabled={disabled}
          aria-label={`Remove ${pdf.file.name}`}
          style={{
            ...removeButton,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "17px",
        borderRadius: "12px",
        border: "1px solid #DCEAD8",
        background: "#FFFFFF",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#777777",
          fontSize: "13px",
          marginBottom: "7px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#0D530E",
          fontSize: "19px",
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function createFileId() {
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

function createOutputFileName(fileName: string) {
  const cleanedName =
    fileName
      .trim()
      .replace(/\.pdf$/i, "")
      .replace(/[<>:"/\\|?*]+/g, "-")
      .replace(/\s+/g, " ")
      .trim() || "smartkit-merged-pdf";

  return `${cleanedName}.pdf`;
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

  const value =
    bytes / Math.pow(1024, unitIndex);

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