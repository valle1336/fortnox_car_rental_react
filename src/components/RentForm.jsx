import React, { useState, useEffect } from "react";
import { fetchCars, createRental } from "../api/api";

function RentForm() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    carId: "",
    driverName: "",
    driverAge: "",
    startDate: "",
    endDate: "",
  });
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars()
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        setFeedback("Could not fetch cars");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    if (
      !form.carId ||
      !form.driverName ||
      !form.driverAge ||
      !form.startDate ||
      !form.endDate
    ) {
      setFeedback("All fields are required");
      return;
    }

    try {
      await createRental(form);
      setFeedback("Rental created successfully!");
      setForm({
        carId: "",
        driverName: "",
        driverAge: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      setFeedback(err.message || "Could not create rental");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Car:</label>
        <select
          name="carId"
          value={form.carId}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">Select car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name} ({car.pricePerDay} SEK/day)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Name:</label>
        <input
          name="driverName"
          value={form.driverName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          name="driverAge"
          value={form.driverAge}
          onChange={handleChange}
          type="number"
          min={18}
        />
      </div>
      <div>
        <label>Start date:</label>
        <input
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          type="date"
        />
      </div>
      <div>
        <label>End date:</label>
        <input
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          type="date"
        />
      </div>
      <button type="submit" disabled={loading}>
        Rent
      </button>
      {feedback && (
        <div
          style={{
            color:
              feedback === "Rental created successfully!" ? "green" : "red",
          }}
        >
          {feedback}
        </div>
      )}
    </form>
  );
}

export default RentForm;
