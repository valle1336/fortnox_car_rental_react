import { fetchCars, fetchRentals, createRental } from "./api";

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe("API methods", () => {
  // 1. Returnerar bil-lista om det lyckas
  it("fetchCars - returns car list on success", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: "Volvo S60", pricePerDay: 1500 }],
    });
    const result = await fetchCars();
    expect(result).toEqual([{ id: 1, name: "Volvo S60", pricePerDay: 1500 }]);
  });
  // 2. Kastar fel om hämtning misslyckas
  it("fetchCars - throws error on failure", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(fetchCars()).rejects.toThrow("Could not fetch cars");
  });
  // 3. Skickar POST och returnerar json om det lyckas
  it("createRental - posts data and returns json", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Rental created!" }),
    });
    const result = await createRental({ carId: 1 });
    expect(result).toEqual({ message: "Rental created!" });
  });
  // 4. Kastar fel om bokning misslyckas
  it("createRental - throws error on failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "Could not create rental",
    });
    await expect(createRental({})).rejects.toThrow("Could not create rental");
  });
});
