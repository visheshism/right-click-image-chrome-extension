import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const searchParams = new URLSearchParams(document.location.search);
  const paramValue = searchParams?.get("data") || null;

  const parsedParam = paramValue?.split(",").map(img => decodeURIComponent(img));

  const [images, setImages] = useState(parsedParam ?? []);

  useEffect(() => {
    if (parsedParam?.length > 0) {
      setImages(() =>
        paramValue
          ?.split(",")
      );
    }
  }, []);

  return (
    <div className="container">
      <h1>Render Images</h1>
      {images.length > 0 ? (
        <div className="grid">
          {images.map((img) => (
            <ImageComp
              url={img}
              key={img}
            />
          ))}
        </div>
      ) : (
        <p
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily: "cursive",
            padding: "50px",
            textAlign: "center",
            color: "#808080",
            opacity: "0.6",
          }}
        >
          No images found !
        </p>
      )}
    </div>
  );
}


const ImageComp = ({ url }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src={url}
        height={"auto"}
        width={"220px"}
        style={{
          border: "0.3px solid grey",
          borderRadius: "4px",
          boxShadow: "-2px -2px 15px 0px #000000",
          margin: "15px",
        }}
      />
    </div>
  );
};

export default App;