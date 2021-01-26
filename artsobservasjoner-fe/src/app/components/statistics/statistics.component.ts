import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  subMenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('statistics');
  }

}
