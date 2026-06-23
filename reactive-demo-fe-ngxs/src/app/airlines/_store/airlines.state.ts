import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Favorize, Favorized, QueryAirlines } from './airlines.actions';
import { Airline } from './airlines.model';
import { ApiService } from './api.service';

@State<Airline[]>({
  name: 'airlines',
  defaults: [],
})
@Injectable()
export class AirlinesState {
  private readonly _service = inject(ApiService);

  @Selector()
  static getAirlines(state: Airline[]) {
    return state;
  }

  @Action(QueryAirlines)
  query({ setState }: StateContext<Airline[]>, { payload }: QueryAirlines) {
    return this._service.getAirlineList(payload).pipe(
      tap((result) => {
        setState(result);
      }),
    );
  }

  @Action(Favorize)
  favorize({ dispatch }: StateContext<Airline[]>, { payload }: Favorize) {
    return this._service
      .setFavorite(payload.id!, payload.favorite!)
      .pipe(tap((result) => dispatch(new Favorized(result))));
  }

  @Action(Favorized)
  favorized({ getState, setState }: StateContext<Airline[]>, { payload }: Favorized) {
    setState(getState().map((a: Airline) => (a.id === payload.id ? payload : a)));
  }
}
