import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem, Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-press2',
  templateUrl: './press2.component.html',
  styleUrls: ['./press2.component.scss']
})

export class Press2Component implements OnInit {

  news$: Observable<NewsItem[]>;
  announcements$: Observable<Announcement[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.news$ = this.dataService.getNews();
    this.announcements$ = this.dataService.getAnnouncements();
  }
}
