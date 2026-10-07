/**
 * Representa un servicio veterinario ofrecido por la clínica.
 * Consumido desde `public/data/services.json` a través de DataService.
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  /** Nombre del icono (p. ej. Material Symbols: 'vaccines', 'pets'). */
  icon: string;
  /** Ruta relativa a la imagen del servicio dentro de public/. */
  image: string;
  price: number;
  /** Código ISO 4217, p. ej. 'USD' o 'BOB'. */
  currency: string;
  /** Duración estimada en minutos. */
  duration: number;
  /** Categoría de agrupación (p. ej. 'preventivo', 'cirugia'). */
  category: string;
  available: boolean;
}
