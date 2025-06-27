import React from "react";
import { render, screen } from "@testing-library/react";
import RentalsList from "./RentalsList";
import * as api from "../api/api";

// Mockar fetchRentals för att kontrollera API-svaret
beforeEach(() => {
  jest.spyOn(api, "fetchRentals").mockResolvedValue([
    {
      id: 1,
      carId: 2,
      driverName: "Anna",
      driverAge: 25,
      startDate: "2025-07-01",
      endDate: "2025-07-03",
      revenue: 4000,
    },
    {
      id: 2,
      carId: 3,
      driverName: "Kalle",
      driverAge: 29,
      startDate: "2025-08-05",
      endDate: "2025-08-09",
      revenue: 12000,
    },
  ]);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("RentalsList", () => {
  // 1. Renderar tabellrader för uthyrningar
  it("renders rentals table with rows", async () => {
    render(<RentalsList />);
    expect(await screen.findByText(/Anna/i)).toBeInTheDocument();
    expect(screen.getByText(/Kalle/i)).toBeInTheDocument();
    expect(screen.getByText("4000")).toBeInTheDocument();
    expect(screen.getByText("12000")).toBeInTheDocument();
  });

  // 2. Visar felmeddelande om API-anrop misslyckas
  it("shows error message if fetch fails", async () => {
    api.fetchRentals.mockRejectedValueOnce(new Error("API error"));
    render(<RentalsList />);
    expect(
      await screen.findByText(/Could not fetch rentals/i)
    ).toBeInTheDocument();
  });

  // 3. Visar laddningstext när data laddas
  it("shows loading text while loading", () => {
    jest
      .spyOn(api, "fetchRentals")
      .mockImplementation(() => new Promise(() => {}));
    render(<RentalsList />);
    expect(screen.getByText(/Loading rentals/i)).toBeInTheDocument();
  });
});
