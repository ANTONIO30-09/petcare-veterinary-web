import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Specialty } from '../../../core/models/specialty.model';

/**
 * Tarjeta reutilizable de una especialidad veterinaria.
 */
@Component({
  selector: 'app-specialty-card',
  templateUrl: './specialty-card.html',
  styleUrl: './specialty-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyCard {
  readonly specialty = input.required<Specialty>();
}
