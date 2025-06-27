import React from "react";

function IndexPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f8fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 32px 32px",
          borderRadius: "14px",
          boxShadow: "0 2px 16px rgba(30,50,80,0.06)",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 0.5,
            marginBottom: 28,
            color: "#214",
          }}
        >
          Fortnox Car Rental
        </h1>
        <button
          onClick={() => (window.location.href = "/rent")}
          style={buttonStyle}
        >
          Rent a Car
        </button>
        <button
          onClick={() => (window.location.href = "/admin")}
          style={{ ...buttonStyle, background: "#f5f6fa", color: "#294" }}
        >
          Admin Page
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  fontSize: 18,
  padding: "12px 32px",
  margin: "0 0 18px 0",
  border: "none",
  borderRadius: "6px",
  background: "#2176ff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 1px 5px rgba(20,30,60,0.05)",
  transition: "background 0.16s, color 0.16s",
};

export default IndexPage;
