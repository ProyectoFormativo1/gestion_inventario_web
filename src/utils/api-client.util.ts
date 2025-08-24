// apiClient.ts
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status}`);
  }

  // ✅ Manejo seguro de respuestas sin contenido
  if (response.status === 204) {
    return null; // o {} dependiendo de lo que prefieras
  }

  // ✅ Validar que realmente hay contenido antes de parsear
  const text = await response.text();
  if (!text) {
    return null; // o {}, para evitar errores
  }

  try {
    return JSON.parse(text);
  } catch {
    return text; // fallback si no es JSON
  }
};
