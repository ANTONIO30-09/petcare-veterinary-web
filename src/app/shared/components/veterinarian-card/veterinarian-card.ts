import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { Veterinarian } from '../../../core/models/veterinarian.model';

/**
 * Tarjeta de presentación profesional de un veterinario.
 * - Foto a sangre completa (aspect 4:5) con object-position top.
 * - Fallback automático a iniciales si la foto falla o no existe.
 * - `specialtyName` opcional: nombre legible de la especialidad.
 */
@Component({
  selector: 'app-veterinarian-card',
  templateUrl: './veterinarian-card.html',
  styleUrl: './veterinarian-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VeterinarianCard {
  readonly veterinarian = input.required<Veterinarian>();
  readonly specialtyName = input<string>('');

  /** True cuando la imagen falló → mostramos iniciales. */
  protected readonly photoFailed = signal(false);

  protected readonly showPhoto = computed(
    () => !this.photoFailed() && !!this.veterinarian().photo,
  );

  protected readonly initials = computed(() =>
    this.veterinarian()
      .name.split(' ')
      .filter((part) => !part.endsWith('.'))
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(''),
  );

  protected onPhotoError(): void {
    this.photoFailed.set(true);
  }
}
