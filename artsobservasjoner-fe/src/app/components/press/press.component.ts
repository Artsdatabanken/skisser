import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BUTTON_STYLES } from 'src/app/models/layout';
import { NewsItem, Announcement } from 'src/app/models/press';
import { PressService } from 'src/app/services/press.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})

export class PressComponent implements OnInit {

  news$: Observable<NewsItem[]>;
  announcements$: Observable<Announcement[]>;
  public buttonStyles: typeof BUTTON_STYLES = BUTTON_STYLES;

  constructor(private pressService: PressService) { }

  ngOnInit(): void {

    this.news$ = this.pressService.getNews();
    this.announcements$ = this.pressService.getAnnouncements();

  }

}
