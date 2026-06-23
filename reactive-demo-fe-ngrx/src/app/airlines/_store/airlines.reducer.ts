import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as AirlineActions from './airlines.actions';
import { Airline } from './airlines.model';

const airlinesAdapter = createEntityAdapter<Airline>();

interface AirlineState extends EntityState<Airline> {
}

const initialState: AirlineState = airlinesAdapter.getInitialState();

export const airlinesReducer = createReducer(
  initialState,
  on(AirlineActions.loaded, (state, {airlines}) => {
    return airlinesAdapter.setAll(airlines, state);
  }),
  on(AirlineActions.favorized, (state, {airline}) => {
    return airlinesAdapter.updateOne({id: airline.id, changes: airline}, state);
  })
);

const getAirlinesState = createFeatureSelector<AirlineState>('airlines');

export const {
  selectAll
} = airlinesAdapter.getSelectors(getAirlinesState);
