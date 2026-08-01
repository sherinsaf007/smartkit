import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { tools } from "../data/tools";

export const metadata = {
  title: "Tool Categories | SmartKit",
  description:
    "Browse SmartKit calculators, image tools, PDF utilities, and productivity tools by category.",
};

export default function CategoriesPage() {
  const groupedTools = tools.reduce<Record<string, typeof tools>>(
    (groups, tool) => {
      const category = tool.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(tool);

      return groups;
    },
    {}
  );

  const categoryOrder = [
    "Calculator",
    "Image",
    "PDF",
    "Utility",
    "Developer",
    "Text",
    "Other",
  ];

  const sortedCategories = Object.keys(groupedTools).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#FBF5DD",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <header
            style={{
              textAlign: "center",
              marginBottom: "45px",
            }}
          >
            <h1
              style={{
                margin: "0 0 14px",
                color: "#0D530E",
                fontSize: "clamp(34px, 5vw, 50px)",
              }}
            >
              Browse Tool Categories
            </h1>

            <p
              style={{
                maxWidth: "750px",
                margin: "0 auto",
                color: "#666666",
                fontSize: "17px",
                lineHeight: 1.7,
              }}
            >
              Find calculators, image tools, PDF utilities, and everyday online
              tools organised into simple categories.
            </p>
          </header>

          <section
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "18px",
              marginBottom: "45px",
            }}
          >
            {sortedCategories.map((category) => (
              <a
                key={category}
                href={`#${createCategoryId(category)}`}
                style={{
                  padding: "22px",
                  borderRadius: "15px",
                  background: "#FFFFFF",
                  border: "1px solid #DCE9D7",
                  textDecoration: "none",
                  boxShadow: "0 7px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "31px",
                    marginBottom: "10px",
                  }}
                >
                  {getCategoryIcon(category)}
                </div>

                <h2
                  style={{
                    margin: "0 0 7px",
                    color: "#0D530E",
                    fontSize: "20px",
                  }}
                >
                  {getCategoryTitle(category)}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#666666",
                    fontSize: "14px",
                  }}
                >
                  {groupedTools[category].length} tool
                  {groupedTools[category].length === 1 ? "" : "s"}
                </p>
              </a>
            ))}
          </section>

          {sortedCategories.map((category) => (
            <section
              key={category}
              id={createCategoryId(category)}
              style={{
                marginBottom: "45px",
                scrollMarginTop: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "30px",
                  }}
                >
                  {getCategoryIcon(category)}
                </span>

                <div>
                  <h2
                    style={{
                      margin: "0 0 4px",
                      color: "#0D530E",
                      fontSize: "28px",
                    }}
                  >
                    {getCategoryTitle(category)}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#777777",
                      fontSize: "14px",
                    }}
                  >
                    {getCategoryDescription(category)}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {groupedTools[category].map((tool) => (
                  <Link
                    key={tool.link}
                    href={tool.link}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "185px",
                      padding: "24px",
                      borderRadius: "16px",
                      background: "#FFFFFF",
                      border: "1px solid #E1E8DE",
                      textDecoration: "none",
                      boxShadow: "0 8px 22px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          color: "#0D530E",
                          fontSize: "21px",
                          lineHeight: 1.4,
                        }}
                      >
                        {tool.title}
                      </h3>

                      {tool.isNew && (
                        <span
                          style={{
                            flexShrink: 0,
                            padding: "5px 9px",
                            borderRadius: "20px",
                            background: "#E8F4E4",
                            color: "#0D530E",
                            fontSize: "11px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                          }}
                        >
                          New
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        margin: "13px 0 20px",
                        color: "#666666",
                        fontSize: "15px",
                        lineHeight: 1.7,
                      }}
                    >
                      {tool.description}
                    </p>

                    <span
                      style={{
                        marginTop: "auto",
                        color: "#0D530E",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      Open Tool →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

function createCategoryId(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getCategoryTitle(category: string) {
  const titles: Record<string, string> = {
    Calculator: "Calculators",
    Image: "Image Tools",
    PDF: "PDF Tools",
    Utility: "Utilities",
    Developer: "Developer Tools",
    Text: "Text Tools",
    Other: "Other Tools",
  };

  return titles[category] || category;
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    Calculator: "🧮",
    Image: "🖼️",
    PDF: "📄",
    Utility: "🛠️",
    Developer: "💻",
    Text: "📝",
    Other: "✨",
  };

  return icons[category] || "✨";
}

function getCategoryDescription(category: string) {
  const descriptions: Record<string, string> = {
    Calculator:
      "Useful financial, health, percentage, age, and everyday calculators.",
    Image:
      "Compress, resize, convert, and manage images directly in your browser.",
    PDF:
      "Create, combine, and manage PDF documents quickly and privately.",
    Utility:
      "Simple online tools for common productivity and everyday tasks.",
    Developer:
      "Helpful utilities for developers, designers, and technical users.",
    Text:
      "Format, count, convert, and organise text content online.",
    Other:
      "Additional SmartKit tools that support everyday digital tasks.",
  };

  return descriptions[category] || "Explore the available SmartKit tools.";
}