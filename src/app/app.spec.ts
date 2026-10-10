import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the navbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render the footer and chatbot widget', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-footer')).toBeTruthy();
    expect(el.querySelector('app-chatbot-widget')).toBeTruthy();
  });

  it('should have a main landmark with id="main-content"', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const main = fixture.nativeElement.querySelector('main#main-content');
    expect(main).toBeTruthy();
  });

  it('should render the skip-link for accessibility', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const skip = fixture.nativeElement.querySelector('a.skip-link');
    expect(skip?.textContent).toContain('Saltar al contenido');
  });
});
