import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem, Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})

export class PressComponent implements OnInit {

  pageTitle$: Observable<string>;
  news$: Observable<NewsItem[]>;
  announcements$: Observable<Announcement[]>;

  constructor(
    private dataService: DataService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_press');
    this.news$ = this.dataService.getNews();
    this.announcements$ = this.dataService.getAnnouncements();
  }

}
