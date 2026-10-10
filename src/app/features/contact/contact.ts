import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder de la sección Contacto.
 * Se completará en la Fase 13 (Reactive Forms + persistencia local).
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
