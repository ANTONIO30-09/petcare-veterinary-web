import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { MapPoint, MapView } from '../../shared/components/map-view/map-view';

@Component({
  selector: 'app-locations',
  imports: [RouterLink, MapView],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Locations {
  private readonly dataService = inject(DataService);

  protected readonly locations = toSignal(this.dataService.getLocations(), {
    initialValue: [],
  });

  protected readonly totalCount = computed(() => this.locations().length);

  /** Índice de la sucursal activa. */
  protected readonly selectedIndex = signal(0);

  protected readonly selectedLocation = computed(
    () => this.locations()[this.selectedIndex()] ?? null,
  );

  /** Puntos para el mapa. */
  protected readonly mapPoints = computed<MapPoint[]>(() =>
    this.locations().map((l) => ({
      id: l.id,
      name: l.name,
      address: l.address,
      lat: l.coordinates.lat,
      lng: l.coordinates.lng,
    })),
  );

  protected readonly activeId = computed(() => this.selectedLocation()?.id ?? null);

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
