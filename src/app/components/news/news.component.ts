import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/models/newsItem';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  news: NewsItem[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getNews().subscribe(
      res => {
        this.news = res;
      },
      error => {
        console.log('error', error);
      }
    )

  }

}
