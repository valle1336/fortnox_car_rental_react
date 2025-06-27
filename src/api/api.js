export async function fetchCars() {
  const response = await fetch("http://localhost:8080/cars/getAll");
  if (!response.ok) {
    throw new Error("Kunde inte hämta bilar");
  }
  return await response.json();
}
