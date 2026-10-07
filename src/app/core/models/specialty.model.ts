/**
 * Especialidad veterinaria (dermatología, cardiología, etc.).
 * Consumida desde `public/data/specialties.json`.
 */
export interface Specialty {
  id: string;
  name: string;
  description: string;
  image: string;
  /** IDs de veterinarios que ejercen esta especialidad. */
  veterinarianIds: string[];
}
