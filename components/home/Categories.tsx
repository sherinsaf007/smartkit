type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  const categories = ["All", "Finance", "Text", "Utilities"];

  return (
    <div
      style={{
        marginTop: "80px",
      }}
    >
      <h2
        style={{
          color: "#0D530E",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        📂 Categories
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {categories.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedCategory(item)}
            style={{
              background:
                selectedCategory === item ? "#0D530E" : "#E7E1B1",
              color:
                selectedCategory === item ? "white" : "#0D530E",
              padding: "14px 24px",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}