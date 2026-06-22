import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AirlinesEffects } from './_store/airlines.effects';
import { airlinesReducer } from './_store/airlines.reducer';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { AirlinesComponent } from './airlines.component';

@NgModule({
  exports: [
    AirlinesComponent
  ], imports: [
    // ANGULAR
    CommonModule,
    // MATERIAL
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    // NGRX
    StoreModule.forFeature('airlines', airlinesReducer),
    EffectsModule.forFeature([AirlinesEffects]),
    AirlinesComponent,
    AirlinesListComponent
  ], providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AirlinesModule {

}
