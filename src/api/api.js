const API_URL = process.env.REACT_APP_API_URL;

export async function fetchCars() {
  const response = await fetch(`${API_URL}/cars/getAll`);
  if (!response.ok) {
    throw new Error("Could not fetch cars");
  }
  return await response.json();
}

export async function fetchRentals() {
  const response = await fetch(`${API_URL}/rentals/getAll`);
  if (!response.ok) {
    throw new Error("Could not fetch rentals");
  }
  return await response.json();
}
