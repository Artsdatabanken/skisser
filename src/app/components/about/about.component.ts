import { Component, OnInit } from '@angular/core';
import { AboutItem } from 'src/app/models/aboutItem';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  subMenu: any[];
  aboutItems: AboutItem[];

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('about');

    this.dataService.getAboutItems().subscribe(
      res => {
        this.aboutItems = res;
      },
      error => {
        console.log('error', error);
      }
    )

  }

  getAboutItemUrl(slug: string): string {
    return `about/${slug}`;
  }

}
