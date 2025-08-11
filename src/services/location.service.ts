import { Location } from "@/types/location";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAllLocationsApi = async (): Promise<Location[]> => {
  const response = await fetch(`${BASE_URL}/location`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener locaciones");
  return response.json();
};
