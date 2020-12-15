import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleImage } from 'src/app/models/articleImage';
import { NewsItem } from 'src/app/models/newsItem';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  news: NewsItem[];
  articles: Article[];

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

    this.dataService.getNews2().subscribe(
      (res: any) => {
        this.articles = res;
      },
      error => {
        console.log('error', error);
      }
    );

  }

  getArticleImage(sourceUrl: string): string {
    return `http://localhost:1337${sourceUrl}`;
  }

}
