import React from "react";
import RentForm from "../components/RentForm";

function RentPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          maxWidth: "420px",
          width: "100%",
          padding: "32px 28px",
        }}
      >
        <h1 style={{ marginBottom: 8, textAlign: "center", color: "#385" }}>
          Rent a Car
        </h1>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginBottom: 18,
            background: "#eee",
            color: "#444",
            border: "none",
            borderRadius: "4px",
            padding: "4px 10px",
            cursor: "pointer",
            float: "right",
          }}
        >
          ← Go back
        </button>
        <RentForm />
      </div>
    </div>
  );
}

export default RentPage;
