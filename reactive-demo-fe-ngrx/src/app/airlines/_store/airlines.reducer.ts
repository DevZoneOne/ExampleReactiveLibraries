import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as AirlineActions from './airlines.actions';
import { Airline } from './airlines.model';

export const airlinesAdapter = createEntityAdapter<Airline>();

export interface State extends EntityState<Airline> {
}

export const initialState: State = airlinesAdapter.getInitialState();

export const airlinesReducer = createReducer(
  initialState,
  on(AirlineActions.loaded, (state, {airlines}) => {
    return airlinesAdapter.setAll(airlines, state);
  }),
  on(AirlineActions.favorized, (state, {airline}) => {
    return airlinesAdapter.updateOne({id: airline.id, changes: airline}, state);
  })
);

export const getAirlinesState = createFeatureSelector<State>('airlines');

export const {
  selectAll
} = airlinesAdapter.getSelectors(getAirlinesState);
