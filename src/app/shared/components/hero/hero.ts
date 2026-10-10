import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Bloque hero de la página principal.
 * En esta fase el copy es estático; si en el futuro se reutiliza con
 * variantes, se puede exponer vía `input()`.
 */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
