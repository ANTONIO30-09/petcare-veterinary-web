import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Service } from '../../../core/models/service.model';

/**
 * Tarjeta reutilizable de un servicio veterinario.
 * El `Service` llega por Signal input y se consume en el template.
 */
@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCard {
  readonly service = input.required<Service>();
}
