import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getServices() hace GET a /data/services.json', () => {
    service.getServices().subscribe();
    const req = httpMock.expectOne('/data/services.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getSpecialties() hace GET a /data/specialties.json', () => {
    service.getSpecialties().subscribe();
    const req = httpMock.expectOne('/data/specialties.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getVeterinarians() hace GET a /data/veterinarians.json', () => {
    service.getVeterinarians().subscribe();
    const req = httpMock.expectOne('/data/veterinarians.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getLocations() hace GET a /data/locations.json', () => {
    service.getLocations().subscribe();
    const req = httpMock.expectOne('/data/locations.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
