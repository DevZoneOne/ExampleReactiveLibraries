import {AfterViewInit, Component, effect, inject, input, signal, viewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow
} from '@angular/material/table';
import {take} from 'rxjs/operators';
import {Airline} from '../airlines.model';
import {AirlinesService} from '../airlines.service';
import {MatIconButton} from '@angular/material/button';

import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'demo-airlines-list',
  templateUrl: './airlines-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class AirlinesListComponent implements AfterViewInit {

  readonly country = input.required<string>();

  readonly displayedColumns = ['favorite', 'id', 'name', 'iata', 'icao', 'callsign'];

  dataSource: MatTableDataSource<Airline> = new MatTableDataSource<Airline>();
  readonly paginator = viewChild.required(MatPaginator);

  private readonly _service = inject(AirlinesService);
  private readonly _airlines = signal<Airline[]>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this._airlines();
    });
    effect(() => {
      this._service.getAirlineList(this.country())
        .subscribe({
          next: (airlines) => {
            this._airlines.set(airlines);
          },
          error: () => {
            this._airlines.set([]);
          }
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
  }

  updateFavorite(id: number, favorite: boolean) {
    const previousData = this._airlines();
    this._airlines.update(airlines =>
      airlines.map(airline =>
        airline.id === id ? {...airline, favorite} : airline
      )
    );

    this._service.setFavorite(id, favorite).pipe(
      take(1)
    ).subscribe({
      error: () => {
        this._airlines.set(previousData);
      }
    });
  }
}
