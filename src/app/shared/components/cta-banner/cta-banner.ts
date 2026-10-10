import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Banner de llamada a la acción reutilizable.
 * Enlaces a /contacto y /nosotros vía routerLink.
 */
@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaBanner {}
