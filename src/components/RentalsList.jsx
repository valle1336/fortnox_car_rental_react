import React, { useState, useEffect } from "react";
import { fetchRentals } from "../api/api";

function RentalsList() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRentals()
      .then((data) => {
        setRentals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Kunde inte hämta uthyrningar");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laddar uthyrningar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Uthyrningar</h2>
      <table>
        <thead>
          <tr>
            <th>Förare</th>
            <th>Bil-ID</th>
            <th>Ålder</th>
            <th>Från</th>
            <th>Till</th>
            <th>Intäkt (kr)</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.driverName}</td>
              <td>{rental.carId}</td>
              <td>{rental.driverAge}</td>
              <td>{rental.startDate}</td>
              <td>{rental.endDate}</td>
              <td>{rental.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RentalsList;
