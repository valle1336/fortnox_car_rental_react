import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RentForm from "./RentForm";
import * as api from "../api/api";

beforeEach(() => {
  jest.spyOn(api, "fetchCars").mockResolvedValue([
    { id: 1, name: "Volvo S60", pricePerDay: 1500 },
    { id: 2, name: "Ford Mustang", pricePerDay: 3000 },
  ]);
  jest.spyOn(api, "createRental").mockResolvedValue({});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("RentForm", () => {
  // Test 1: Formuläret renderar alla fält korrekt
  it("renders all input fields", async () => {
    render(<RentForm />);
    expect(await screen.findByLabelText(/Car:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pickup date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Drop off date:/i)).toBeInTheDocument();
  });

  // Test 2: Skickar vi in tomt formulär så visas ett felmeddelande
  it("shows an error if fields are empty on submit", async () => {
    render(<RentForm />);
    const button = await screen.findByRole("button", { name: /rent car/i });
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText(/All fields are required/i)).toBeInTheDocument()
    );
  });

  // Test 3: Om man fyller i alla fält och submit, så ska createRental-anropet göras med korrekt data
  it("calls createRental with correct data", async () => {
    render(<RentForm />);
    await screen.findByText(/Volvo S60/i);

    fireEvent.change(screen.getByLabelText(/Car:/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText(/Age:/i), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText(/Pickup date:/i), {
      target: { value: "2025-07-01" },
    });
    fireEvent.change(screen.getByLabelText(/Drop off date:/i), {
      target: { value: "2025-07-05" },
    });

    fireEvent.click(screen.getByRole("button", { name: /rent car/i }));

    await waitFor(() => {
      expect(api.createRental).toHaveBeenCalledWith({
        carId: "2",
        driverName: "Alex",
        driverAge: "25",
        startDate: "2025-07-01",
        endDate: "2025-07-05",
        revenue: 12000,
      });
      expect(screen.getByText(/Rental created!/i)).toBeInTheDocument();
    });
  });
});
