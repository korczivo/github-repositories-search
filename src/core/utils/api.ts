export async function fetchJSONData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch!');
  }
  const data = await response.json();
  return data;
}
