import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';
import { Hero } from '../../shared/components/hero/hero';
import { VideoHero } from '../../shared/components/video-hero/video-hero';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, VideoHero, ServiceCard, CtaBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly dataService = inject(DataService);

  protected readonly services = toSignal(this.dataService.getServices(), {
    initialValue: [],
  });

  protected readonly featuredServices = computed(() => this.services().slice(0, 4));
}
