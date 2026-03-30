export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud');
  }
  return data;
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  return apiFetch(path);
}

export async function apiPost<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiFetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function apiPut<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiFetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiFetch(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function apiDelete<T = unknown>(path: string): Promise<T> {
  return apiFetch(path, {
    method: 'DELETE',
  });
}