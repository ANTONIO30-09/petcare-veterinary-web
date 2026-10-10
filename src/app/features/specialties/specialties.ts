import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-specialties',
  imports: [RouterLink],
  templateUrl: './specialties.html',
  styleUrl: './specialties.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Specialties {
  private readonly dataService = inject(DataService);

  protected readonly specialties = toSignal(this.dataService.getSpecialties(), {
    initialValue: [],
  });

  protected readonly totalCount = computed(() => this.specialties().length);
}
