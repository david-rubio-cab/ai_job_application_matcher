import React from "react";
import UploadCV from "./UploadCV"; // importa tu componente

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 40 }}>Buscador de empleo en base a CV</h1>
      <UploadCV /> {/* Aquí se renderiza tu componente */}
    </div>
  );
};

export default App;
