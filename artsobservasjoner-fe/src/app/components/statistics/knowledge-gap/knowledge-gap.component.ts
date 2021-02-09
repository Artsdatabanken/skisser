import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-knowledge-gap',
  templateUrl: './knowledge-gap.component.html',
  styleUrls: ['./knowledge-gap.component.scss']
})

export class KnowledgeGapComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
   
  }

}
