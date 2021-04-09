import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from 'src/app/models/press';
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
  
    this.news$ = this.dataService.getNews();

  }

  getArticleImage(sourceUrl: string): string {
    return `http://localhost:1337${sourceUrl}`;
  }

}
