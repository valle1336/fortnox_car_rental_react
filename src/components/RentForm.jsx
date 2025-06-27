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
    const cost = getCost();
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
      await createRental({
        ...form,
        revenue: cost,
      });
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
    <div
      style={{
        maxWidth: 430,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 16,

        padding: 32,
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        <div>
          <label htmlFor="carId" style={labelStyle}>
            Car:
          </label>
          <select
            name="carId"
            id="carId"
            value={form.carId}
            onChange={handleChange}
            disabled={loading}
            style={inputStyle}
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
          <label htmlFor="driverName" style={labelStyle}>
            Name:
          </label>
          <input
            id="driverName"
            name="driverName"
            value={form.driverName}
            onChange={handleChange}
            autoComplete="off"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="driverAge" style={labelStyle}>
            Age:
          </label>
          <input
            id="driverAge"
            name="driverAge"
            value={form.driverAge}
            onChange={handleChange}
            type="number"
            min={18}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="startDate" style={labelStyle}>
            Pickup date:
          </label>
          <input
            id="startDate"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            type="date"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="endDate" style={labelStyle}>
            Drop off date:
          </label>
          <input
            id="endDate"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            type="date"
            style={inputStyle}
          />
        </div>
        {cost && (
          <div
            style={{
              padding: "16px",
              margin: "8px 0",
              background: "#f1faf1",
              color: "#235d23",
              fontWeight: 600,
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(35,93,35,0.08)",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            Cost: {cost} SEK
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 0",
            background: "#35836a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: 17,
            marginTop: "6px",
            boxShadow: "0 2px 6px rgba(53,131,106,0.11)",
            cursor: loading ? "wait" : "pointer",
            transition: "background 0.18s",
          }}
        >
          Rent car
        </button>
        {feedback && (
          <div
            style={{
              color: feedback === "Rental created!" ? "#235d23" : "#c22",
              background: "#f9f9f9",
              border: `1.5px solid ${
                feedback === "Rental created!" ? "#adebad" : "#fbb"
              }`,
              padding: "10px",
              marginTop: "2px",
              borderRadius: 8,
              fontWeight: 500,
              textAlign: "center",
              boxShadow:
                feedback === "Rental created!"
                  ? "0 1px 4px #adebad55"
                  : "0 1px 4px #ffbbbb44",
            }}
          >
            {feedback}
          </div>
        )}
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 4,
  fontWeight: 500,
  color: "#253b4a",
};

const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: 6,
  border: "1.5px solid #dde2ee",
  fontSize: 16,
  marginTop: 2,
  marginBottom: 2,
  background: "#f8fafc",
};

export default RentForm;
