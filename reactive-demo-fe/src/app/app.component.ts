import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AirlinesComponent } from './airlines/airlines.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AirlinesComponent]
})
export class AppComponent {
}
