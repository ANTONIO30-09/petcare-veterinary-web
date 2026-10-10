import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from '../../core/services/data.service';
import { Hero } from '../../shared/components/hero/hero';
import { ServiceCard } from '../../shared/components/service-card/service-card';

@Component({
  selector: 'app-home',
  imports: [Hero, ServiceCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly dataService = inject(DataService);

  protected readonly services = toSignal(this.dataService.getServices(), {
    initialValue: [],
  });
}
