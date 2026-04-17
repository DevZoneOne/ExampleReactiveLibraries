import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AirlinesModule } from './app/airlines/airlines.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, 
        // NGRX
        StoreModule.forRoot(reducers), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            connectInZone: true
        }), EffectsModule.forRoot([]), 
        // APP
        AirlinesModule)
    ]
})
  .catch(err => console.log(err));
