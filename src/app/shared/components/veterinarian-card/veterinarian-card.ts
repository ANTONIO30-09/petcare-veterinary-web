import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Veterinarian } from '../../../core/models/veterinarian.model';

/**
 * Tarjeta reutilizable de un veterinario.
 * Iniciales calculadas a partir del nombre, ignorando títulos como "Dr." / "Dra.".
 * `specialtyName` es opcional: nombre legible de la especialidad, para mostrar
 * como pill si el caller lo conoce (p. ej. desde Home resolviendo el JSON).
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

  protected readonly initials = computed(() =>
    this.veterinarian()
      .name.split(' ')
      .filter((part) => !part.endsWith('.'))
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(''),
  );
}
