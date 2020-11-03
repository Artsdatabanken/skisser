import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

  menuSections$: Observable<string[]>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void { 
    this.menuSections$ = this.navigationService.getMenuSectionItems('report');
  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }

}
