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

export async function createRental(rental) {
  const response = await fetch(`${API_URL}/rentals/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rental),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Något gick fel vid bokning.");
  }
  return response.json();
}
