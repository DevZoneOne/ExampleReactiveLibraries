import {Observable, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Airline} from './airlines.model';

@Injectable()
export class AirlinesService {

  constructor(private _http: HttpClient) {
  }

  getAirlineList(country: string): Observable<Airline[]> {
    return this._http
      .get<Airline[]>(
        `/api/airline/${country}`
      )
      .pipe(
        catchError((err: Response) => throwError(() => new Error(err.statusText)))
      );
  }


  setFavorite(id: number, favorite: boolean) {
    return this._http
      .put<Airline>(
        `/api/airline/${id}/favorite`,
        favorite
      )
  }
}
