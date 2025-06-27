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
        justifyContent: "center",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          maxWidth: "440px",
          width: "100%",
          padding: "0 0 28px 0",
          position: "relative",
        }}
      >
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            background: "#f0f2f5",
            color: "#385",
            border: "none",
            borderRadius: "50px",
            padding: "6px 16px",
            fontWeight: 500,
            fontSize: 15,
            margin: "18px 0 0 18px",
            cursor: "pointer",
            boxShadow: "0 1px 3px #eef3ed66",
            transition: "background 0.16s",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          ← Go back
        </button>
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            color: "#253b4a",
            fontSize: 28,
            paddingTop: 34,
            paddingBottom: 8,
            fontWeight: 600,
            letterSpacing: "-1px",
          }}
        >
          Rent a Car
        </h1>
        <div style={{ padding: "0 24px" }}>
          <RentForm />
        </div>
      </div>
    </div>
  );
}

export default RentPage;
