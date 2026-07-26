import ToolCard from "../ToolCard";

type Tool = {
  title: string;
  description: string;
  link: string;
  category: string;
};

type Props = {
  tools: Tool[];
  search: string;
  selectedCategory: string;
};

export default function FeaturedTools({
  tools,
  search,
  selectedCategory,
}: Props) {
  return (
    <div
      style={{
        marginTop: "70px",
      }}
    >
      <h2
        style={{
          color: "#0D530E",
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "15px",
        }}
      >
        Featured Tools
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "18px",
          marginBottom: "45px",
        }}
      >
        Explore our most popular free online tools.
      </p>

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tools
          .filter((tool) =>
            tool.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter(
            (tool) =>
              selectedCategory === "All" ||
              tool.category === selectedCategory
          )
          .map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              link={tool.link}
            />
          ))}
      </div>
    </div>
  );
}