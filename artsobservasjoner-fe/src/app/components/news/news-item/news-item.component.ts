import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsItem } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})

export class NewsItemComponent implements OnInit {

  pageTitle: string;
  newsItemId: number;
  newsItem: NewsItem;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.newsItemId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.subscription = this.dataService.getNewsItemById(this.newsItemId).subscribe(ni => {
      this.newsItem = ni;
      this.pageTitle = ni.title;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
