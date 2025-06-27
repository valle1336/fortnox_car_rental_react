import React from "react";
import RentalsList from "../components/RentalsList";

function AdminPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 950,
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: 16, textAlign: "center", color: "black" }}>
          Admin – Rentals Overview
        </h1>

        <RentalsList />
      </div>
    </div>
  );
}

export default AdminPage;
