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

  const getCost = () => {
    const car = cars.find((c) => c.id === Number(form.carId));
    if (!car || !form.startDate || !form.endDate) return "";
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const msPerDay = 1000 * 60 * 60 * 24;
    const days = Math.ceil((end - start) / msPerDay);
    if (isNaN(days) || days <= 0) return "";
    return days * car.pricePerDay;
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
      setFeedback("All fields are required.");
      return;
    }
    try {
      await createRental(form);
      setFeedback("Rental created!");
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

  const cost = getCost();

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
      <div>
        <label htmlFor="carId" style={{ display: "block", marginBottom: 2 }}>
          Car:
        </label>
        <select
          name="carId"
          id="carId"
          value={form.carId}
          onChange={handleChange}
          disabled={loading}
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
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
        <label
          htmlFor="driverName"
          style={{ display: "block", marginBottom: 2 }}
        >
          Name:
        </label>
        <input
          id="driverName"
          name="driverName"
          value={form.driverName}
          onChange={handleChange}
          autoComplete="off"
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
        />
      </div>
      <div>
        <label
          htmlFor="driverAge"
          style={{ display: "block", marginBottom: 2 }}
        >
          Age:
        </label>
        <input
          id="driverAge"
          name="driverAge"
          value={form.driverAge}
          onChange={handleChange}
          type="number"
          min={18}
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
        />
      </div>
      <div>
        <label
          htmlFor="startDate"
          style={{ display: "block", marginBottom: 2 }}
        >
          Start date:
        </label>
        <input
          id="startDate"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          type="date"
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
        />
      </div>
      <div>
        <label htmlFor="endDate" style={{ display: "block", marginBottom: 2 }}>
          End date:
        </label>
        <input
          id="endDate"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          type="date"
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
        />
      </div>
      {cost && (
        <div
          style={{
            padding: "12px",
            margin: "4px 0",
            background: "#f1faf1",
            color: "#235d23",
            fontWeight: 600,
            borderRadius: 6,
          }}
        >
          Cost: {cost} SEK
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 0",
          background: "#385",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: loading ? "wait" : "pointer",
        }}
      >
        Rent car
      </button>
      {feedback && (
        <div
          style={{
            color: feedback === "Rental created!" ? "#235d23" : "#c22",
            background: "#f9f9f9",
            border: `1px solid ${
              feedback === "Rental created!" ? "#adebad" : "#fbb"
            }`,
            padding: "8px",
            marginTop: "2px",
            borderRadius: 5,
            fontWeight: 500,
          }}
        >
          {feedback}
        </div>
      )}
    </form>
  );
}

export default RentForm;
