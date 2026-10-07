/**
 * Estructura tipada de los valores del formulario de contacto.
 * Usada por el Reactive Form en features/contact.
 */
export interface ContactFormValue {
  name: string;
  email: string;
  phone: string;
  message: string;
  petName?: string;
  petType?: string;
}

/**
 * Registro de contacto persistido localmente (localStorage).
 * Añade metadatos de envío sin backend real.
 */
export interface ContactForm extends ContactFormValue {
  id: string;
  submittedAt: string; // ISO 8601
}
