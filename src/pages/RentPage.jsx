import React from "react";
import RentForm from "../components/RentForm";

function RentPage() {
  const handleRent = (data) => {
    console.log("Hyra skickad:", data);
    // Här lägger du till fetch/axios till backend senare!
  };

  return (
    <div>
      <h1>Hyra bil</h1>
      <RentForm onSubmit={handleRent} />
    </div>
  );
}

export default RentPage;
