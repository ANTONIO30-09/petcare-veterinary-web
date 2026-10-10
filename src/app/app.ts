import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { ChatbotWidget } from './shared/components/chatbot-widget/chatbot-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ChatbotWidget],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
