import React, { useState, useEffect } from "react";
import { fetchRentals } from "../api/api";

function RentalsList() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revenueHeaderClicks, setRevenueHeaderClicks] = useState(0);

  useEffect(() => {
    fetchRentals()
      .then((data) => {
        setRentals(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not fetch rentals");
        setLoading(false);
      });
  }, []);

  const totalRevenue = rentals.reduce((sum, r) => sum + (r.revenue || 0), 0);

  if (loading) return <p style={{ padding: 16 }}>Loading rentals...</p>;
  if (error) return <p style={{ color: "red", padding: 16 }}>{error}</p>;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        maxWidth: 860,
        margin: "32px auto",
      }}
    >
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
          float: "left",
        }}
      >
        ← Go back
      </button>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>All Rentals</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 16,
        }}
      >
        <thead>
          <tr style={{ background: "#f6f8fa" }}>
            <th style={th}>Driver</th>
            <th style={th}>Car ID</th>
            <th style={th}>Age</th>
            <th style={th}>From</th>
            <th style={th}>To</th>
            <th
              style={{ ...th, cursor: "pointer" }}
              onClick={() => setRevenueHeaderClicks((prev) => prev + 1)}
              title="Click me!"
            >
              {revenueHeaderClicks >= 3 ? "💰" : "Revenue (SEK)"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental, idx) => (
            <tr
              key={rental.id}
              style={{
                background: idx % 2 ? "#f9fbfc" : "#fff",
              }}
            >
              <td style={td}>{rental.driverName}</td>
              <td style={td}>{rental.carId}</td>
              <td style={td}>{rental.driverAge}</td>
              <td style={td}>{rental.startDate}</td>
              <td style={td}>{rental.endDate}</td>
              <td style={td}>{rental.revenue}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={5}
              style={{ ...td, fontWeight: "bold", textAlign: "right" }}
            >
              Total revenue:
            </td>
            <td style={{ ...td, fontWeight: "bold" }}>{totalRevenue} SEK</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const th = {
  padding: "12px 8px",
  borderBottom: "2px solid #dde3e8",
  textAlign: "left",
};

const td = {
  padding: "10px 8px",
  borderBottom: "1px solid #eef2f5",
};

export default RentalsList;
