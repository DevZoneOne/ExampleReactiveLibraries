async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error(`Backend returned code ${response.status}, body was:`, body);
    throw new Error('Something bad happened; please try again later.');
  }
  return response.json();
}

export async function getCountryList() {
  const response = await fetch('/api/airline/countries');
  return handleResponse(response);
}

export async function getAirlineList(country) {
  const response = await fetch(`/api/airline/${encodeURIComponent(country)}`);
  return handleResponse(response);
}

export async function setFavorite(id, favorite) {
  const response = await fetch(`/api/airline/${id}/favorite`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favorite),
  });
  return handleResponse(response);
}
