import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Bloque de video principal de la Home.
 * El video se sirve por URL externa (Pexels). Si falla la carga, se
 * muestra un fallback con gradiente y mensaje (ver `.video-hero--fallback`).
 */
@Component({
  selector: 'app-video-hero',
  templateUrl: './video-hero.html',
  styleUrl: './video-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoHero {
  protected readonly videoFailed = signal(false);
  protected readonly videoSrc = 'https://www.pexels.com/download/video/7469716/';

  protected onError(): void {
    this.videoFailed.set(true);
  }
}
