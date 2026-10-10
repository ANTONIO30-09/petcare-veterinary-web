import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Bloque editorial "Sobre PetCare" con 3 valores institucionales.
 * Reutilizable en Home y About.
 */
@Component({
  selector: 'app-info-block',
  imports: [RouterLink],
  templateUrl: './info-block.html',
  styleUrl: './info-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlock {}
