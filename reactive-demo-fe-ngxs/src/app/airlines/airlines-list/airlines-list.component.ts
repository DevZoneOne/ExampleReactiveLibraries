import { AfterViewInit, Component, effect, inject, input, viewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Favorize, QueryAirlines } from '../_store/airlines.actions';
import { Airline } from '../_store/airlines.model';
import { AirlinesState } from '../_store/airlines.state';

@Component({
  selector: 'demo-airlines-list',
  templateUrl: './airlines-list.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
  ],
})
export class AirlinesListComponent implements AfterViewInit {
  readonly country = input.required<string>();

  readonly displayedColumns = ['favorite', 'id', 'name', 'iata', 'icao', 'callsign'];

  dataSource: MatTableDataSource<Airline> = new MatTableDataSource<Airline>();
  readonly paginator = viewChild(MatPaginator);

  private readonly _store = inject(Store);
  private readonly _airlines = this._store.selectSignal(AirlinesState.getAirlines);

  constructor() {
    effect(() => {
      this.dataSource.data = this._airlines();
    });
    effect(() => {
      this._store.dispatch(new QueryAirlines(this.country()));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
  }

  updateFavorite(id: number, favorite: boolean) {
    this._store.dispatch(
      new Favorize({
        id: id,
        favorite: favorite,
      }),
    );
  }
}
