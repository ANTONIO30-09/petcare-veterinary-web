import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { Hero } from '../../shared/components/hero/hero';
import { VideoHero } from '../../shared/components/video-hero/video-hero';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { SpecialtyCard } from '../../shared/components/specialty-card/specialty-card';
import { LocationCard } from '../../shared/components/location-card/location-card';
import { VeterinarianCard } from '../../shared/components/veterinarian-card/veterinarian-card';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Hero,
    VideoHero,
    ServiceCard,
    SpecialtyCard,
    LocationCard,
    VeterinarianCard,
    CtaBanner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly dataService = inject(DataService);

  protected readonly services = toSignal(this.dataService.getServices(), {
    initialValue: [],
  });

  protected readonly specialties = toSignal(this.dataService.getSpecialties(), {
    initialValue: [],
  });

  protected readonly locations = toSignal(this.dataService.getLocations(), {
    initialValue: [],
  });

  protected readonly veterinarians = toSignal(this.dataService.getVeterinarians(), {
    initialValue: [],
  });

  protected readonly featuredServices = computed(() => this.services().slice(0, 4));

  /** Mapa id de especialidad → nombre visible, para pasar a las vet-cards. */
  private readonly specialtyNames = computed(() => {
    const map = new Map<string, string>();
    for (const spec of this.specialties()) map.set(spec.id, spec.name);
    return map;
  });

  protected specialtyNameOf(id: string): string {
    return this.specialtyNames().get(id) ?? '';
  }
}
