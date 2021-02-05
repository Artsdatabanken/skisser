import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-alien-species',
  templateUrl: './alien-species.component.html',
  styleUrls: ['./alien-species.component.scss']
})

export class AlienSpeciesComponent implements OnInit {



  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {



  }

}
