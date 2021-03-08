import { Component, OnInit } from '@angular/core';
import { TOTAL_COUNT_STATISTICS } from 'src/app/models/statistics';

@Component({
  selector: 'app-artsobs-numbers',
  templateUrl: './artsobs-numbers.component.html',
  styleUrls: ['./artsobs-numbers.component.scss']
})

export class ArtsobsNumbersComponent implements OnInit {
  
  totalCountStatistics: typeof TOTAL_COUNT_STATISTICS = TOTAL_COUNT_STATISTICS;
  constructor() { }

  ngOnInit(): void { }

}
