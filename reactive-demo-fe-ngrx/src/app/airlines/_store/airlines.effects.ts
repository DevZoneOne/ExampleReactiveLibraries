import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AirlineActionTypes, Favorize, Favorized, Loaded, Query } from './airlines.actions';
import { Airline } from './airlines.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AirlinesEffects {

  
  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AirlineActionTypes.QUERY),
    map((action: Query) => action.payload),
    switchMap(payload => this._http.get<Airline[]>(`/api/airline/${payload}`)),
    map(list => new Loaded(list))
  ))

  
  modify$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AirlineActionTypes.FAVORIZE),
    map((action: Favorize) => action.payload),
    switchMap((airline: Partial<Airline>) => {
      return this._http
        .put<Airline>(
        `/api/airline/${airline.id}/favorite`,
        airline.favorite
      )
    }),
    map(airline => new Favorized(airline))
  ));

  constructor(private actions$: Actions,
              private _http: HttpClient) {
  }
}
