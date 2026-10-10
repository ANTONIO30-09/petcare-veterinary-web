import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(DataService);
  private readonly contactService = inject(ContactService);

  protected readonly locations = toSignal(this.dataService.getLocations(), {
    initialValue: [],
  });

  /** Señal de éxito: muestra el panel verde tras enviar. */
  protected readonly submitted = signal(false);

  /** Último contacto enviado (para mostrar en el mensaje de éxito). */
  protected readonly lastContactName = signal('');

  /** Contador de campos de contacto guardados. */
  protected readonly savedCount = computed(() => this.contactService.getAll().length);

  /** Formulario reactivo con valores no nulos. */
  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[+\d\s\-()]{6,20}$/)]],
    petName: [''],
    petType: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  /** Helper para el template: atajo a los controles. */
  protected get controls() {
    return this.form.controls;
  }

  /** Devuelve true si el control fue tocado y es inválido. */
  protected showError(controlName: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[controlName];
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.contactService.save(value);
    this.lastContactName.set(value.name);
    this.submitted.set(true);
  }

  protected resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
    this.lastContactName.set('');
  }
}
