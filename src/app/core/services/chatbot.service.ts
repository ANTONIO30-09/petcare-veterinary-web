import { Injectable } from '@angular/core';

/**
 * Servicio simulado del chatbot de PetCare.
 * No hay backend: el matching es por palabras clave sobre reglas locales.
 * Se reutilizará también en `features/chatbot` (Fase 14).
 */
@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private readonly rules: ReadonlyArray<{ keywords: string[]; response: string }> = [
    {
      keywords: ['hola', 'buenas', 'hey'],
      response: '¡Hola! Soy PetBot 🐾 ¿En qué puedo ayudarte?',
    },
    {
      keywords: ['horario', 'abren', 'cierran', 'atencion', 'atención'],
      response:
        'Atendemos de lunes a sábado de 08:00 a 20:00. La sucursal Sur también abre domingos hasta las 21:00.',
    },
    {
      keywords: ['precio', 'costo', 'cuanto', 'cuánto', 'tarifa'],
      response:
        'Los precios varían según el servicio. Consulta general BOB 80 y vacunación BOB 120. Mira la sección Precios para el detalle.',
    },
    {
      keywords: ['ubicacion', 'ubicación', 'sucursal', 'direccion', 'dirección', 'donde', 'dónde'],
      response:
        'Contamos con 3 sucursales: Central, Norte y Sur. Visita la sección Ubicaciones para direcciones y teléfonos.',
    },
    {
      keywords: ['cita', 'reservar', 'agendar', 'turno'],
      response: 'Puedes agendar una cita desde la sección Contacto. Te responderemos a la brevedad.',
    },
    {
      keywords: ['vacuna', 'vacunación', 'vacunacion'],
      response: 'Aplicamos vacunas esenciales con carné sanitario. El precio base es BOB 120 por dosis.',
    },
    {
      keywords: ['emergencia', 'urgente', 'urgencia'],
      response:
        'Para emergencias llama directamente a la sucursal más cercana. Atendemos urgencias en horario extendido.',
    },
    {
      keywords: ['gracias', 'thanks'],
      response: '¡Con gusto! Cualquier otra consulta, aquí estoy 🐶',
    },
  ];

  private readonly fallback =
    'No estoy seguro de esa consulta 🤔. Puedes preguntarme por horarios, precios, ubicaciones, citas o vacunas.';

  responder(message: string): string {
    const normalized = message.toLowerCase().trim();
    if (!normalized) return this.fallback;
    for (const rule of this.rules) {
      if (rule.keywords.some((kw) => normalized.includes(kw))) {
        return rule.response;
      }
    }
    return this.fallback;
  }
}
