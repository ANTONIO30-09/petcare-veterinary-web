import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Service } from '../../../core/models/service.model';

/**
 * Tabla compacta de precios de servicios.
 * Recibe la lista por input, la ordena por precio ascendente y marca
 * el servicio más económico de la categoría `preventivo` como "Más solicitado".
 */
@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.html',
  styleUrl: './pricing-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingTable {
  readonly services = input.required<Service[]>();

  protected readonly sorted = computed(() =>
    [...this.services()].sort((a, b) => a.price - b.price),
  );

  protected readonly popularId = computed(() => {
    const preventivos = this.services()
      .filter((s) => s.category === 'preventivo')
      .sort((a, b) => a.price - b.price);
    return preventivos[0]?.id ?? null;
  });
}
