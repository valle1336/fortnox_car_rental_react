import React from "react";
import RentForm from "../components/RentForm";

function RentPage() {
  const handleRent = (data) => {
    console.log("Hyra skickad:", data);
  };

  return (
    <div>
      <h1>Rent car</h1>
      <button onClick={() => (window.location.href = "/")}>Go back</button>
      <RentForm onSubmit={handleRent} />
    </div>
  );
}

export default RentPage;
