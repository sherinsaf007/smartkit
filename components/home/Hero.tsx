type HeroProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Hero({
  search,
  setSearch,
}: HeroProps) {
  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto",
        paddingTop: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          color: "#0D530E",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        SmartKit
      </h1>

      <p
        style={{
          fontSize: "24px",
          color: "#306D29",
          marginBottom: "10px",
        }}
      >
        100+ Free Online Tools for Everyday Use
      </p>

      <p
        style={{
          color: "#666",
          fontSize: "18px",
          marginBottom: "35px",
        }}
      >
        Fast • Free • No Signup Required
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "650px",
            padding: "18px 24px",
            fontSize: "18px",
            borderRadius: "50px",
            border: "2px solid #E7E1B1",
            outline: "none",
            background: "white",
            boxShadow: "0 15px 40px rgba(13,83,14,0.12)",
          }}
        />
      </div>

      <p
        style={{
          color: "#888",
          fontSize: "15px",
        }}
      >
        ⭐ Trusted by users for quick and accurate calculations
      </p>
    </div>
  );
}