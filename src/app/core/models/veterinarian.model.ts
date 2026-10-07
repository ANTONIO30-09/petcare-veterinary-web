/**
 * Profesional veterinario de la clínica.
 * Consumido desde `public/data/veterinarians.json`.
 */
export interface Veterinarian {
  id: string;
  name: string;
  /** Cargo profesional (p. ej. 'Médico Veterinario Zootecnista'). */
  title: string;
  /** ID de la especialidad principal (ver Specialty.id). */
  specialty: string;
  bio: string;
  /** Ruta relativa a la foto dentro de public/. */
  photo: string;
  email?: string;
  phone?: string;
  yearsExperience?: number;
}
