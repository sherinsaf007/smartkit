import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function PageContainer({ children }: Props) {
  return (
    <>
      <Navbar />

      <main
        style={{
          background:
            "linear-gradient(to bottom, #FBF5DD 0%, #FFFDF5 50%, #FFFFFF 100%)",
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}