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
        <h1 style={{ marginBottom: 16, textAlign: "center", color: "#214" }}>
          Admin – Rentals Overview
        </h1>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginBottom: 16,
            background: "#eee",
            color: "#444",
            border: "none",
            borderRadius: "4px",
            padding: "6px 14px",
            cursor: "pointer",
            float: "right",
          }}
        >
          ← Go back
        </button>
        <RentalsList />
      </div>
    </div>
  );
}

export default AdminPage;
