import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
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
