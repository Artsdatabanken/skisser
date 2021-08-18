import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-species-list-table',
  templateUrl: './detailed-species-list-table.component.html',
  styleUrls: ['./detailed-species-list-table.component.scss']
})

export class DetailedSpeciesListTableComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
