import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  menuSections$: Observable<string[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void { 
    this.menuSections$ = this.navigationService.getMenuSectionItems('projects');
  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }


}
