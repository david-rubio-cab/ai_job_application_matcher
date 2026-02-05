import React from "react";
import UploadCV from "./UploadCV"; // Import my component

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 40 }}>Buscador de empleo en base a CV</h1>
      <UploadCV /> {/* Here I render the UploadCV component */}
    </div>
  );
};

export default App;
