import { Injectable } from "@angular/core";
import { Action, NgxsAfterBootstrap, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "./api.service";
import { FetchAllCountries } from "./countries.actions";
import { tap } from "rxjs";

@State<string[]>({
    name:'countries',
    defaults: []
})
@Injectable()
export class CountriesState implements NgxsAfterBootstrap {

  constructor(private _service: ApiService) {
  }

  ngxsAfterBootstrap(ctx: StateContext<string[]>): void {
    ctx.dispatch(new FetchAllCountries());
  }

  @Selector()
  static getCountries(state: string[]) {
    return state;
  }

  @Action(FetchAllCountries)
  query({setState}: StateContext<string[]>) {
    return this._service.getCountryList()
      .pipe(
        tap(result => {
          setState(result);
        })
      );
  }

}