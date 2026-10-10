import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  viewChild,
} from '@angular/core';

import * as L from 'leaflet';

export interface MapPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

/**
 * Mapa interactivo con Leaflet + OpenStreetMap tiles.
 * - Carga los tiles como <img> → no bloqueable por políticas de iframe.
 * - Reacciona a cambios en `points` y `activeId` redibujando markers.
 */
@Component({
  selector: 'app-map-view',
  template: `<div #mapContainer class="map-view"></div>`,
  styles: [`
    :host { display: block; }
    .map-view {
      width: 100%;
      height: 100%;
      min-height: 34rem;
      border-radius: var(--pc-radius-lg);
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapView implements AfterViewInit, OnDestroy {
  readonly points = input.required<MapPoint[]>();
  readonly activeId = input<string | null>(null);

  private readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');

  private map: L.Map | null = null;
  private markers = new Map<string, L.Marker>();
  private defaultIcon: L.Icon | null = null;
  private activeIcon: L.DivIcon | null = null;

  constructor() {
    // Redibuja cuando cambian los inputs.
    effect(() => {
      const pts = this.points();
      const active = this.activeId();
      if (this.map && pts.length) {
        this.renderMarkers(pts, active);
      }
    });
  }

  ngAfterViewInit(): void {
    this.defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Icono activo: mismo pero más grande visualmente (podemos personalizar con divIcon)
    this.activeIcon = L.divIcon({
      className: 'map-marker-active',
      html: `
        <div style="
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #4FAF84 0%, #1B4332 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 6px 16px rgba(27,67,50,0.35);
          border: 3px solid #fff;
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            color: #fff; font-size: 18px; font-weight: 800;
          ">★</span>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    });

    // Centro por defecto: Santa Cruz de la Sierra
    this.map = L.map(this.mapContainer().nativeElement, {
      center: [-17.7833, -63.1821],
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(this.map);

    // Primer render
    const pts = this.points();
    if (pts.length) this.renderMarkers(pts, this.activeId());
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  private renderMarkers(points: MapPoint[], activeId: string | null): void {
    if (!this.map || !this.defaultIcon || !this.activeIcon) return;

    // Elimina markers previos
    this.markers.forEach((m) => m.remove());
    this.markers.clear();

    points.forEach((p) => {
      const icon = p.id === activeId ? this.activeIcon! : this.defaultIcon!;
      const marker = L.marker([p.lat, p.lng], { icon })
        .addTo(this.map!)
        .bindPopup(
          `<strong>${p.name}</strong><br/><span style="font-size:12px;color:#3A5A68">${p.address}</span>`
        );
      this.markers.set(p.id, marker);
    });

    // Centrar en el punto activo (o en el conjunto)
    const active = points.find((p) => p.id === activeId);
    if (active) {
      this.map.flyTo([active.lat, active.lng], 15, { duration: 0.8 });
      this.markers.get(active.id)?.openPopup();
    } else {
      const group = L.featureGroup(Array.from(this.markers.values()));
      this.map.fitBounds(group.getBounds().pad(0.3));
    }
  }
}
