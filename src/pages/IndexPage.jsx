import React from "react";

function IndexPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#e8f1fc 0%, #f6f8fa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "44px 36px 36px",
          borderRadius: "18px",
          boxShadow:
            "0 10px 32px rgba(34,64,160,0.12), 0 2px 8px rgba(40,50,70,0.06)",
          minWidth: 340,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: 0.5,
            marginBottom: 36,
            color: "#20425b",
            textShadow: "0 2px 8px #cbe6fa66",
          }}
        >
          Fortnox Car Rental
        </h1>
        <button
          onClick={() => (window.location.href = "/rent")}
          style={{ ...buttonStyle, marginBottom: 14 }}
        >
          🚗 Rent a Car
        </button>
        <button
          onClick={() => (window.location.href = "/admin")}
          style={{
            ...buttonStyle,
            background: "#f4f7f2",
            color: "#254d2e",
            border: "1px solid #deede2",
          }}
        >
          Admin Page
        </button>
      </div>
      <div style={{ marginTop: 60, color: "#aaa", fontSize: 14 }}>
        <span>Created for Fortnox assignment • {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

// Knappar får skugga, snygg padding och “hover”-effekt
const buttonStyle = {
  fontSize: 20,
  padding: "13px 36px",
  width: 220,
  margin: 0,
  border: "none",
  borderRadius: "7px",
  background: "#2176ff",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 2px 9px rgba(30,80,200,0.06)",
  transition: "background 0.13s, color 0.13s, box-shadow 0.13s",
  outline: "none",
};
export default IndexPage;
