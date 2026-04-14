export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur de recuperation ...");
  }
  return await response.json();
}
