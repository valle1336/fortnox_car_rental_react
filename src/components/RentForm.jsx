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
      {cost && (
        <div>
          <strong>Cost: {cost} SEK</strong>
        </div>
      )}
      <button type="submit" disabled={loading}>
        Rent car
      </button>
      {feedback && (
        <div
          style={{
            color: feedback === "Rental created!" ? "green" : "red",
            marginTop: "1em",
          }}
        >
          {feedback}
        </div>
      )}
    </form>
  );
}

export default RentForm;
