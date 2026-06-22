import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AirlinesModule } from './airlines/airlines.module';
import { reducers } from './app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      // NGRX
      StoreModule.forRoot(reducers),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
        connectInZone: true
      }),
      EffectsModule.forRoot([]),
      // APP
      AirlinesModule
    )
  ]
};
