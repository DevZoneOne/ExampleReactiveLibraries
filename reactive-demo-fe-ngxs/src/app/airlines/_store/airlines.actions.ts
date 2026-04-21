import { Airline } from './airlines.model';

export class QueryAirlines {
  static readonly type = '[Airlines] query';

  constructor(public payload: string) {
  }
}

export class Favorize {
  static readonly type = '[Airlines] favorize';

  constructor(public payload: Partial<Airline>) {
  }
}

export class Favorized {
  static readonly type = '[Airlines] favorized';

  constructor(public payload: Airline) {
  }
}
