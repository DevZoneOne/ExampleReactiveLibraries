import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Query } from './_store/airlines.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'demo-airlines',
    templateUrl: './airlines.component.html',
    imports: [MatFormField, MatSelect, MatOption, AirlinesListComponent]
})
export class AirlinesComponent implements OnInit {

  countries: String[] = []

  private _country = 'Netherlands';

  constructor(private _store: Store, private _http: HttpClient) {
    this.query(this._country);
  }

  ngOnInit() {
    this.getCountryList().pipe(take(1)).subscribe(next => this.countries = next)
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
    this.query(value);
  }

  private query(country: string) {
    this._store.dispatch(new Query(country));
  }

  // reading country list is done outside of ngrx stores as it's a static list only read once.
  getCountryList(): Observable<String[]> {
    return this._http
      .get<String[]>(
        '/api/airline/countries'
      )
  }

}
