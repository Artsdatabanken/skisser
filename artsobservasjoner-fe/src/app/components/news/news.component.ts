import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/models/newsItem';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  errorMessage: string;
  news$: Observable<NewsItem[]>;
  
  @Input() take: number | null = 0;
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
    //     this.errorMessage = 'Old news not working';
    //   }
    // );

    this.news$ = this.dataService.getNews();

  }

  getArticleImage(sourceUrl: string): string {
    return `http://localhost:1337${sourceUrl}`;
  }

}
