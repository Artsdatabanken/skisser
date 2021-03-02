import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem, Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})

export class PressComponent implements OnInit {

  take: number | null = 6;
  news$: Observable<NewsItem[]>;
  announcements$: Observable<Announcement[]>;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {  
    this.news$ = this.dataService.getNews();
    this.announcements$ = this.dataService.getAnnouncements();
  }

}
