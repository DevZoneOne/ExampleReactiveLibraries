import { Component } from '@angular/core';
import { AirlinesComponent } from './airlines/airlines.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [AirlinesComponent]
})
export class AppComponent {
  title = 'app';
}
