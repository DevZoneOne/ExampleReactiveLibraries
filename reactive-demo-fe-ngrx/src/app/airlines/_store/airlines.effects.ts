import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as AirlineActions from './airlines.actions';
import { Airline } from './airlines.model';

@Injectable()
export class AirlinesEffects {

  private readonly actions$ = inject(Actions);
  private readonly _http = inject(HttpClient);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(AirlineActions.query),
    exhaustMap(({country}) =>
      this._http.get<Airline[]>(`/api/airline/${country}`).pipe(
        map(airlines => AirlineActions.loaded({airlines})),
        catchError(() => EMPTY)
      )
    )
  ));


  modify$ = createEffect(() => this.actions$.pipe(
    ofType(AirlineActions.favorize),
    exhaustMap(({airlinePartial}) =>
      this._http.put<Airline>(
        `/api/airline/${airlinePartial.id}/favorite`,
        airlinePartial.favorite
      ).pipe(
        map(airline => AirlineActions.favorized({airline})),
        catchError(() => EMPTY)
      )
    )
  ));

}
