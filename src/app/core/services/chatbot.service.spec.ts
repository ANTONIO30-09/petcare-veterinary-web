import { TestBed } from '@angular/core/testing';

import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  let service: ChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('responde a saludos', () => {
    expect(service.responder('hola')).toContain('PetBot');
    expect(service.responder('buenas tardes')).toContain('PetBot');
  });

  it('responde a consultas de horario', () => {
    const r = service.responder('¿Cuál es el horario de atención?');
    expect(r).toContain('lunes a sábado');
  });

  it('responde a consultas de precio', () => {
    const r = service.responder('cuanto cuesta una consulta');
    expect(r).toContain('BOB');
  });

  it('responde a consultas de ubicación', () => {
    const r = service.responder('dónde están ubicados');
    expect(r).toContain('sucursales');
  });

  it('responde a consultas de cita', () => {
    const r = service.responder('quiero agendar una cita');
    expect(r).toContain('Contacto');
  });

  it('responde a consultas de vacunas', () => {
    const r = service.responder('información sobre vacunas');
    expect(r).toContain('vacunas');
  });

  it('responde a emergencias', () => {
    const r = service.responder('tengo una emergencia');
    expect(r).toContain('emergencias');
  });

  it('responde a agradecimientos', () => {
    const r = service.responder('gracias');
    expect(r).toContain('gusto');
  });

  it('devuelve fallback para consulta desconocida', () => {
    const r = service.responder('xyzabc123');
    expect(r).toContain('No estoy seguro');
  });

  it('devuelve fallback para mensaje vacío', () => {
    expect(service.responder('')).toContain('No estoy seguro');
    expect(service.responder('   ')).toContain('No estoy seguro');
  });

  it('es case-insensitive', () => {
    expect(service.responder('HORARIO')).toContain('lunes a sábado');
    expect(service.responder('Precio')).toContain('BOB');
  });
});
