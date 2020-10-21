import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {

  menuSections$: Observable<string[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void { 
    this.menuSections$ = this.navigationService.getMenuSectionItems('statistics');
  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }

}
