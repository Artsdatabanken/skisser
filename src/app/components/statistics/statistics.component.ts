import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  submenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.submenu = this.navigationService.getSubMenu('statistics');
  }

}
