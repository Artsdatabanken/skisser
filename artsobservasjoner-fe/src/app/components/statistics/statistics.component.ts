import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  subMenu: any[];
  menuItemTitle: string;

  constructor(private navigationService: NavigationService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('statistics');
  }

}
