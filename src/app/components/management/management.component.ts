import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})

export class ManagementComponent implements OnInit {

  menuSections$: Observable<string[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void { 
    this.menuSections$ = this.navigationService.getMenuSectionItems('management');
  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }

}
