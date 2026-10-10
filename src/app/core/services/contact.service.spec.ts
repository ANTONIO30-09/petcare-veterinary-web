import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { ContactFormValue } from '../models/contact-form.model';

describe('ContactService', () => {
  let service: ContactService;

  const sampleValue: ContactFormValue = {
    name: 'Ana Pérez',
    email: 'ana@test.com',
    phone: '+591 700 00000',
    message: 'Quiero información sobre vacunación.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll() devuelve array vacío al inicio', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('save() persiste un contacto con id y submittedAt', () => {
    const saved = service.save(sampleValue);

    expect(saved.id).toBeTruthy();
    expect(saved.submittedAt).toBeTruthy();
    expect(saved.name).toBe('Ana Pérez');
    expect(service.getAll()).toHaveLength(1);
  });

  it('acumula múltiples contactos', () => {
    service.save(sampleValue);
    service.save({ ...sampleValue, name: 'Carlos' });
    service.save({ ...sampleValue, name: 'Lucía' });

    const all = service.getAll();
    expect(all).toHaveLength(3);
    expect(all.map((c) => c.name)).toEqual(['Ana Pérez', 'Carlos', 'Lucía']);
  });

  it('clear() vacía el almacenamiento', () => {
    service.save(sampleValue);
    service.clear();
    expect(service.getAll()).toEqual([]);
  });

  it('tolera localStorage corrupto sin lanzar error', () => {
    localStorage.setItem('petcare_contacts', 'esto-no-es-json{{{');
    expect(service.getAll()).toEqual([]);
  });
});
