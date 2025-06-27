import React, { useState, useEffect } from "react";
import { fetchCars } from "../api/api";

function RentForm({ onSubmit }) {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    carId: "",
    driverName: "",
    driverAge: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchCars()
      .then(setCars)
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    // console.log(form); // För debugging
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bil:</label>
        <select name="carId" value={form.carId} onChange={handleChange}>
          <option value="">Välj bil</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name} ({car.pricePerDay} kr/dag)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Namn:</label>
        <input
          name="driverName"
          value={form.driverName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ålder:</label>
        <input
          name="driverAge"
          value={form.driverAge}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div>
        <label>Startdatum:</label>
        <input
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          type="date"
        />
      </div>
      <div>
        <label>Slutdatum:</label>
        <input
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          type="date"
        />
      </div>
      <button type="submit">Hyra</button>
    </form>
  );
}

export default RentForm;
