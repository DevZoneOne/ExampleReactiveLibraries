import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, input, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Airline } from '../airlines.model';
import { AirlinesService } from '../airlines.service';
import { MatIconButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'demo-airlines-list',
    templateUrl: './airlines-list.component.html',
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class AirlinesListComponent implements OnInit, AfterViewInit, OnChanges {

  displayedColumns = ['favorite', 'id', 'name', 'iata', 'icao', 'callsign'];

  dataSource: MatTableDataSource<Airline> = new MatTableDataSource<Airline>();

  readonly country = input.required<string>();

  readonly paginator = viewChild.required(MatPaginator);

  constructor(private _service: AirlinesService) {
  }

  ngOnInit() {
    this.updateList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateList();
  }

  private updateList() {
    this._service.getAirlineList(this.country())
      .subscribe({
        next: (airlines) => {
          this.dataSource.data = airlines;
        },
        error: () => {
          this.dataSource.data = [];
        }
      });
  }

  updateFavorite(id: number, favorite: boolean) {
    this._service.setFavorite(id, favorite).pipe(
      take(1)
    ).subscribe(next => this.updateList());
  }
}
