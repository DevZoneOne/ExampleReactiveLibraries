import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { QueryAirlines } from './_store/airlines.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { HttpClient } from '@angular/common/http';
import { CountriesState } from './_store/countries.state';

@Component({
    selector: 'demo-airlines',
    templateUrl: './airlines.component.html',
    imports: [MatFormField, MatSelect, MatOption, AirlinesListComponent]
})
export class AirlinesComponent {

  countries = inject(Store).selectSignal(CountriesState.getCountries);

  private _country = 'Netherlands';

  constructor(private _store: Store, private _http: HttpClient) {
    this.query(this._country);
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
    this.query(value);
  }

  private query(country: string) {
    this._store.dispatch(new QueryAirlines(country));
  }

}
