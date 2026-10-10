import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { VeterinarianCard } from '../../shared/components/veterinarian-card/veterinarian-card';

@Component({
  selector: 'app-about',
  imports: [RouterLink, VeterinarianCard],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly dataService = inject(DataService);

  protected readonly veterinarians = toSignal(this.dataService.getVeterinarians(), {
    initialValue: [],
  });

  protected readonly specialties = toSignal(this.dataService.getSpecialties(), {
    initialValue: [],
  });

  /** Mapa id → nombre para pasar a las cards de veterinarios. */
  private readonly specialtyNames = computed(() => {
    const map = new Map<string, string>();
    for (const spec of this.specialties()) map.set(spec.id, spec.name);
    return map;
  });

  protected specialtyNameOf(id: string): string {
    return this.specialtyNames().get(id) ?? '';
  }
}
