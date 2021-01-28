import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
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
  errorMessage: string;
  news$: Observable<NewsItem[]>;

  @Input() take: number | string | null = 0;
  @Input() location: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
    // this.dataService.getNews().subscribe(
    //   (res: any) => {

    //     if (this.take === 0) {
    //       this.news = res;
    //     }
    //     else {
    //       this.news = res.slice(0, this.take);
    //     }

    //   },
    //   error => {
    //     console.log('error', error);
    //     this.errorMessage = 'WP Det har skjedd en feil. Vennligst prøv igjen senere.';
    //   }
    // );

    // this.dataService.getNews2().subscribe(
    //   (res: any) => {
    //     this.articles = res;
    //   },
    //   error => {
    //     console.log('error', error);
    //     this.errorMessage = 'Strapi Det har skjedd en feil. Vennligst prøv igjen senere.';
    //   }
    // );

    this.dataService.getNews().subscribe(
      (res: any) => {
        if (this.take === 0) {
          this.news = res;
        }
        else {
          this.news = res.slice(0, this.take);
        }
      },
      error => {
        console.log('error', error);
        this.errorMessage = 'Old news not working';
      }
    );

    this.news$ = this.dataService.getNews();

  }

  getArticleImage(sourceUrl: string): string {
    return `http://localhost:1337${sourceUrl}`;
  }

}
