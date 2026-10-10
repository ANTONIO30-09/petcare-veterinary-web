import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Location } from '../../../core/models/location.model';

/**
 * Tarjeta reutilizable de una sucursal de la clínica.
 * `map` y `coordinates` se integrarán en la fase de diseño (mapa embebido).
 */
@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCard {
  readonly location = input.required<Location>();
}
