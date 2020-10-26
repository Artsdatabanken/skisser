import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})

export class ObservationsComponent implements OnInit {

  menuSections$: Observable<string[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void { 
    this.menuSections$ = this.navigationService.getMenuSectionItems('observations');
  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }

}
