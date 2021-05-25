import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveFilter, Filter } from 'src/app/models/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  @Input() parameter: string;
  @Input() filters: Filter[] = [];

  changeFilter: BehaviorSubject<ActiveFilter>;

  constructor() { }

  ngOnInit() {

    const initialFilter = this.filters.find(f => f.active);

    this.changeFilter = new BehaviorSubject<ActiveFilter>({
      parameter: this.parameter,
      id: initialFilter.id
    });

  }

  ngOnDestroy() {
    this.changeFilter.unsubscribe();
  }


}
