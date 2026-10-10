import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'PetCare Veterinary — Inicio',
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/services/services').then((m) => m.Services),
    title: 'PetCare Veterinary — Servicios',
  },
  {
    path: 'especialidades',
    loadComponent: () =>
      import('./features/specialties/specialties').then((m) => m.Specialties),
    title: 'PetCare Veterinary — Especialidades',
  },
  {
    path: 'ubicaciones',
    loadComponent: () => import('./features/locations/locations').then((m) => m.Locations),
    title: 'PetCare Veterinary — Ubicaciones',
  },
  {
    path: 'precios',
    loadComponent: () => import('./features/pricing/pricing').then((m) => m.Pricing),
    title: 'PetCare Veterinary — Precios',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'PetCare Veterinary — Nosotros',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'PetCare Veterinary — Contacto',
  },
  {
    path: 'chatbot',
    loadComponent: () => import('./features/chatbot/chatbot').then((m) => m.Chatbot),
    title: 'PetCare Veterinary — Chatbot',
  },
  { path: '**', redirectTo: '' },
];
