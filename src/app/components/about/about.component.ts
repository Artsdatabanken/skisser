import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  menuSections$: Observable<string[]>;

  test: any;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.menuSections$ = this.navigationService.getMenuSectionItems('about');

    this.test = this.navigationService.getMenuSection('about');

    console.log('test', this.test)

  }

  getLinkUrl(linkUrl: string): string {
    return `/${linkUrl}`;
  }

}
