import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotService } from '../../../core/services/chatbot.service';

export interface ChatMessage {
  id: number;
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot-widget',
  imports: [RouterLink],
  templateUrl: './chatbot-widget.html',
  styleUrl: './chatbot-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotWidget {
  private readonly chatbot = inject(ChatbotService);
  private readonly messageList = viewChild<ElementRef<HTMLDivElement>>('messageList');

  protected readonly open = signal(false);
  protected readonly messages = signal<ChatMessage[]>([
    { id: 0, from: 'bot', text: '¡Hola! Soy PetBot 🐾 ¿En qué puedo ayudarte?' },
  ]);

  private nextId = 1;

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected send(inputEl: HTMLInputElement): void {
    const text = inputEl.value.trim();
    if (!text) return;

    this.appendMessage('user', text);
    inputEl.value = '';
    this.scrollToBottom();

    const reply = this.chatbot.responder(text);
    setTimeout(() => {
      this.appendMessage('bot', reply);
      this.scrollToBottom();
    }, 350);
  }

  protected onKeydown(event: KeyboardEvent, inputEl: HTMLInputElement): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.send(inputEl);
    }
  }

  private appendMessage(from: 'user' | 'bot', text: string): void {
    this.messages.update((list) => [...list, { id: this.nextId++, from, text }]);
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      const el = this.messageList()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
