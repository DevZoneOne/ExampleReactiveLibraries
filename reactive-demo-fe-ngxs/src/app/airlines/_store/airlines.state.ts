import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Favorize, Favorized, Query } from './airlines.actions';
import { Airline } from './airlines.model';
import { AirlinesService } from './airlines.service';
import {Injectable} from '@angular/core';

@State<Airline[]>({
  name: 'airlines',
  defaults: []
})
@Injectable()
export class AirlinesState {

  constructor(private _service: AirlinesService) {
  }

  @Selector()
  static getAirlines(state: Airline[]) {
    return state;
  }

  @Action(Query)
  query({setState}: StateContext<Airline[]>, {payload}: Query) {
    return this._service.getAirlineList(payload)
      .pipe(
        tap(result => {
          setState(result);
        })
      );
  }

  @Action(Favorize)
  favorize({dispatch}: StateContext<Airline[]>, {payload}: Favorize) {
    return this._service.setFavorite(payload.id!, payload.favorite!)
      .pipe(
        tap(
          result => dispatch(new Favorized(result))
        )
      );
  }

  @Action(Favorized)
  favorized({getState, setState}: StateContext<Airline[]>, {payload}: Favorized) {
    let airlines = getState();

    airlines = airlines.map(
      (a: Airline) =>
        a.id === payload.id ? payload : a
    );
    setState(airlines);
  }

}
