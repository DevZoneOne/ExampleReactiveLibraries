import { Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { AirlinesService } from './airlines.service';
import { take } from 'rxjs';

@Component({
    selector: 'demo-airlines',
    templateUrl: './airlines.component.html',
    imports: [MatFormField, MatSelect, MatOption, AirlinesListComponent]
})
export class AirlinesComponent implements OnInit {

  countries: String[] = []

  constructor(private _service: AirlinesService) {
  }

  ngOnInit() {
    this._service.getCountryList().pipe(take(1)).subscribe(next => this.countries = next)
  }

}
