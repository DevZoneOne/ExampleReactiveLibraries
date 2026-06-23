import { Component, inject } from '@angular/core';

import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngxs/store';
import { CountriesState } from './_store/countries.state';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';

@Component({
  selector: 'demo-airlines',
  templateUrl: './airlines.component.html',
  imports: [MatFormField, MatSelect, MatOption, AirlinesListComponent],
})
export class AirlinesComponent {
  private readonly _store = inject(Store);
  countries = this._store.selectSignal(CountriesState.getCountries);
}
