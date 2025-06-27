import React from "react";
import RentalsList from "../components/RentalsList";

function AdminPage() {
  return (
    <div>
      <h1>Admin - Rentals</h1>
      <button onClick={() => (window.location.href = "/")}>Go back</button>
      <RentalsList />
    </div>
  );
}

export default AdminPage;
