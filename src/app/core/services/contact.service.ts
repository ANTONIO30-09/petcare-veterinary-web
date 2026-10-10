import { Injectable } from '@angular/core';

import { ContactForm, ContactFormValue } from '../models/contact-form.model';

/**
 * Servicio de contacto — sin backend.
 * Persiste los mensajes en localStorage bajo la clave `petcare_contacts`.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly storageKey = 'petcare_contacts';

  save(value: ContactFormValue): ContactForm {
    const all = this.getAll();
    const entry: ContactForm = {
      ...value,
      id: this.generateId(),
      submittedAt: new Date().toISOString(),
    };
    all.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
    return entry;
  }

  getAll(): ContactForm[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as ContactForm[]) : [];
    } catch {
      return [];
    }
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  private generateId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
