import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder de la sección Nosotros.
 * Se completará en la Fase 12 (información institucional + veterinarios).
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
