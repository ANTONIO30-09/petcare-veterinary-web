import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder de la sección Chatbot (página completa).
 * Se completará en la Fase 14 con una vista de chat ampliada
 * que reutilizará ChatbotService.
 */
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chatbot {}
