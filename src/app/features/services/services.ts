import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { ServiceCard } from '../../shared/components/service-card/service-card';

@Component({
  selector: 'app-services',
  imports: [RouterLink, ServiceCard],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  private readonly dataService = inject(DataService);

  protected readonly services = toSignal(this.dataService.getServices(), {
    initialValue: [],
  });

  /** Filtro activo: 'all' o el id de una categoría. */
  protected readonly activeFilter = signal<string>('all');

  /** Categorías únicas detectadas desde los datos reales. */
  protected readonly categories = computed(() => {
    const set = new Set<string>();
    for (const s of this.services()) set.add(s.category);
    return ['all', ...Array.from(set).sort()];
  });

  /** Lista visible según filtro. */
  protected readonly filtered = computed(() => {
    const filter = this.activeFilter();
    const all = this.services();
    return filter === 'all' ? all : all.filter((s) => s.category === filter);
  });

  protected readonly totalCount = computed(() => this.services().length);
  protected readonly visibleCount = computed(() => this.filtered().length);

  protected setFilter(category: string): void {
    this.activeFilter.set(category);
  }

  /** Etiqueta bonita para los chips ("preventivo" → "Preventivo"). */
  protected labelFor(category: string): string {
    if (category === 'all') return 'Todos';
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
