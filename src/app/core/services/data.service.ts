import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Service } from '../models/service.model';
import { Specialty } from '../models/specialty.model';
import { Veterinarian } from '../models/veterinarian.model';
import { Location } from '../models/location.model';

/**
 * Servicio central de acceso a los datos estáticos de la aplicación.
 * Los JSON viven en `public/data/` y se sirven como assets.
 *
 * Contrato: devuelve Observables tipados. Los componentes son libres de
 * convertirlos a Signals (`toSignal`) o consumirlos como Observable.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/data';

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services.json`);
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.baseUrl}/specialties.json`);
  }

  getVeterinarians(): Observable<Veterinarian[]> {
    return this.http.get<Veterinarian[]>(`${this.baseUrl}/veterinarians.json`);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/locations.json`);
  }
}
