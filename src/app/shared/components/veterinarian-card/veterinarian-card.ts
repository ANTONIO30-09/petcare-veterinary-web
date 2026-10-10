import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { Veterinarian } from '../../../core/models/veterinarian.model';

/**
 * Tarjeta de veterinario con dos variantes:
 * - `full` (por defecto): tarjeta de presentación con foto a sangre completa.
 * - `minimal`: avatar con iniciales, sin foto. Pensada para la Home.
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
  readonly variant = input<'full' | 'minimal'>('full');

  protected readonly isMinimal = computed(() => this.variant() === 'minimal');

  /** True cuando la imagen falló → mostramos iniciales (solo en full). */
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
