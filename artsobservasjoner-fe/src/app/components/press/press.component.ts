import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BUTTON_STYLES } from 'src/app/models/layout';
import { NewsItem, Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})

export class PressComponent implements OnInit {

  news$: Observable<NewsItem[]>;
  announcements$: Observable<Announcement[]>;
  public buttonStyles: typeof BUTTON_STYLES = BUTTON_STYLES;

  data$;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.news$ = this.dataService.getNews();
    this.announcements$ = this.dataService.getAnnouncements();

    this.data$ = this.dataService.getData().subscribe();
  }

}
