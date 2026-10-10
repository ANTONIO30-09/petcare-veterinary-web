import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotService } from '../../core/services/chatbot.service';

interface ChatMessage {
  id: number;
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  imports: [RouterLink],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chatbot {
  private readonly chatbot = inject(ChatbotService);
  private readonly messageList = viewChild<ElementRef<HTMLDivElement>>('messageList');

  protected readonly messages = signal<ChatMessage[]>([
    {
      id: 0,
      from: 'bot',
      text: '¡Hola! Soy PetBot 🐾 Tu asistente virtual de PetCare. Puedo ayudarte con horarios, precios, ubicaciones, citas y vacunación. ¿En qué te ayudo hoy?',
    },
  ]);

  protected readonly quickQuestions: ReadonlyArray<{ icon: string; label: string; query: string }> = [
    { icon: 'schedule', label: '¿Cuál es el horario?', query: 'horario' },
    { icon: 'attach_money', label: '¿Cuánto cuesta?', query: 'precio' },
    { icon: 'location_on', label: '¿Dónde están?', query: 'ubicación' },
    { icon: 'event', label: 'Quiero agendar', query: 'cita' },
    { icon: 'vaccines', label: 'Sobre vacunas', query: 'vacuna' },
    { icon: 'emergency', label: 'Emergencias', query: 'emergencia' },
  ];

  protected readonly topics: ReadonlyArray<{ icon: string; title: string; desc: string }> = [
    { icon: 'schedule', title: 'Horarios', desc: 'Atención de lunes a sábado' },
    { icon: 'attach_money', title: 'Precios', desc: 'Tarifas de todos los servicios' },
    { icon: 'location_on', title: 'Sucursales', desc: '3 ubicaciones en la ciudad' },
    { icon: 'event', title: 'Citas', desc: 'Agenda por contacto directo' },
    { icon: 'vaccines', title: 'Vacunación', desc: 'Calendario y carné sanitario' },
    { icon: 'emergency', title: 'Urgencias', desc: 'Atención prioritaria' },
  ];

  private nextId = 1;

  protected send(inputEl: HTMLInputElement): void {
    const text = inputEl.value.trim();
    if (!text) return;

    this.append('user', text);
    inputEl.value = '';
    this.scrollToBottom();

    const reply = this.chatbot.responder(text);
    setTimeout(() => {
      this.append('bot', reply);
      this.scrollToBottom();
    }, 400);
  }

  protected sendSuggestion(query: string): void {
    this.append('user', query);
    this.scrollToBottom();

    const reply = this.chatbot.responder(query);
    setTimeout(() => {
      this.append('bot', reply);
      this.scrollToBottom();
    }, 400);
  }

  protected onKeydown(event: KeyboardEvent, inputEl: HTMLInputElement): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.send(inputEl);
    }
  }

  protected clearChat(): void {
    this.messages.set([
      {
        id: 0,
        from: 'bot',
        text: 'Chat reiniciado 🐾 ¿En qué puedo ayudarte?',
      },
    ]);
    this.nextId = 1;
  }

  private append(from: 'user' | 'bot', text: string): void {
    this.messages.update((list) => [...list, { id: this.nextId++, from, text }]);
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      const el = this.messageList()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
