import { Component } from '@angular/core';
import { AirlinesModule } from './airlines/airlines.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [AirlinesModule]
})
export class App {}
