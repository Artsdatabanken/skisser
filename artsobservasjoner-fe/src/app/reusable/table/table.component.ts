import { Component, Input, OnInit } from '@angular/core';
import { TableColumn, TableRow } from 'src/app/models/reusable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent<T> implements OnInit {

  @Input() caption: string;
  @Input() columns: TableColumn<T>[];
  @Input() rows: TableRow<T>[];
  @Input() width?: string;

  alignment: any;


  // public dataSource = new MatTableDataSource<TableRow<T>>();
  // public dataSource: any;
  // public columnNames: string[];

  constructor() { }

  ngOnInit(): void {
    // this.dataSource = this.rows;
    // this.columnNames = this.columns.map((column) => column.name.toString());

    this.alignment = this.columns.map((column) => {

      if (column.alignment) {
        return column.alignment.toString();
      }

    });

    console.log('alignment', this.alignment)
    console.log('columns', this.columns)
    console.log('rows', this.rows)

  }

  getTableWidth(width: string): string {
    return `tbl--${width}`;
  }

  getTableCellStyle(alignment: string): string {
    return `tbl__cell--${alignment}`;
  }

}
