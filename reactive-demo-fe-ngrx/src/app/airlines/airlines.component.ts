import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Observable, take } from 'rxjs';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';

@Component({
  selector: 'demo-airlines',
  templateUrl: './airlines.component.html',
  imports: [CommonModule, MatSelectModule, AirlinesListComponent]
})
export class AirlinesComponent implements OnInit {

  countries = signal<string[]>([]);
  private readonly _http = inject(HttpClient);

  ngOnInit() {
    this.getCountryList()
      .pipe(take(1))
      .subscribe(next => this.countries.set(next));
  }

  // reading country list is done outside NGRX stores as it's a static list only read once.
  getCountryList(): Observable<string[]> {
    return this._http
      .get<string[]>(
        '/api/airline/countries'
      );
  }

}
