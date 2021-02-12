import { Component, Input, OnInit } from '@angular/core';
import { TableColumn, TableRow } from 'src/app/models/reusable';
import { TableComponent } from 'src/app/reusable/table/table.component';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.scss']
})

export class OverviewItemComponent implements OnInit {

  @Input() title?: string;
  @Input() table?: TableComponent<any>;
  // @Input() data: { columns: TableColumn<any>[], rows: TableRow<any>[] };
  @Input() dataTableColumns: TableColumn<any>[];
  @Input() dataTableRows: TableRow<any>[];


  constructor() { }

  ngOnInit(): void {
  }

}
