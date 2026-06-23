import { inject, Injectable } from '@angular/core';
import { Action, NgxsAfterBootstrap, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import { FetchAllCountries } from './countries.actions';

@State<string[]>({
  name: 'countries',
  defaults: [],
})
@Injectable()
export class CountriesState implements NgxsAfterBootstrap {
  private readonly _service = inject(ApiService);

  ngxsAfterBootstrap(ctx: StateContext<string[]>): void {
    ctx.dispatch(new FetchAllCountries());
  }

  @Selector()
  static getCountries(state: string[]) {
    return state;
  }

  @Action(FetchAllCountries)
  query({ setState }: StateContext<string[]>) {
    return this._service.getCountryList().pipe(
      tap((result) => {
        setState(result);
      }),
    );
  }
}
