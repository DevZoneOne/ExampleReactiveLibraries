import { createAction, props } from '@ngrx/store';
import { Airline } from './airlines.model';

export const query = createAction(
  '[Airlines] query',
  props<{ country: string }>()
);

export const loaded = createAction(
  '[Airlines] loaded',
  props<{ airlines: Airline[] }>()
);

export const favorize = createAction(
  '[Airlines] favorize',
  props<{ airlinePartial: Partial<Airline> }>()
);

export const favorized = createAction(
  '[Airlines] favorized',
  props<{ airline: Airline }>()
);
