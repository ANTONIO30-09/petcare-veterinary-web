/**
 * Coordenadas geográficas de una sucursal.
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Sucursal / ubicación física de la clínica.
 * Consumida desde `public/data/locations.json`.
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  /** Horario en texto libre (p. ej. 'Lun–Sáb 08:00–20:00'). */
  schedule: string;
  /** URL embebible o enlace a Google Maps. */
  map: string;
  coordinates: Coordinates;
}
