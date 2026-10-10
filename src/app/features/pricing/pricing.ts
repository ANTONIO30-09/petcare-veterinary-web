import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Service } from '../../core/models/service.model';
import { DataService } from '../../core/services/data.service';

interface Plan {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  fromPrice: number;
  currency: string;
  services: Service[];
  popular: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  private readonly dataService = inject(DataService);

  protected readonly services = toSignal(this.dataService.getServices(), {
    initialValue: [],
  });

  protected readonly totalCount = computed(() => this.services().length);

  /** Los 3 planes se derivan de la categoría de cada servicio. */
  protected readonly plans = computed<Plan[]>(() => {
    const all = this.services();

    const byCategory = (cat: string) => all.filter((s) => s.category === cat);
    const minPrice = (list: Service[]) =>
      list.length ? Math.min(...list.map((s) => s.price)) : 0;
    const currency = all[0]?.currency ?? 'BOB';

    const preventivo = byCategory('preventivo');
    const diagnostico = byCategory('diagnostico');
    const cirugia = byCategory('cirugia');

    return [
      {
        id: 'preventivo',
        name: 'Preventivo',
        tagline: 'Cuidado continuo',
        icon: 'vaccines',
        description: 'Mantén a tu mascota sana con chequeos y vacunas al día.',
        fromPrice: minPrice(preventivo),
        currency,
        services: preventivo,
        popular: true,
      },
      {
        id: 'diagnostico',
        name: 'Diagnóstico',
        tagline: 'Cuando necesitas respuestas',
        icon: 'biotech',
        description: 'Estudios de laboratorio e imagen para diagnósticos precisos.',
        fromPrice: minPrice(diagnostico),
        currency,
        services: diagnostico,
        popular: false,
      },
      {
        id: 'cirugia',
        name: 'Cirugía',
        tagline: 'Procedimientos avanzados',
        icon: 'medical_services',
        description: 'Intervenciones con anestesia controlada y monitoreo post-op.',
        fromPrice: minPrice(cirugia),
        currency,
        services: cirugia,
        popular: false,
      },
    ];
  });
}
