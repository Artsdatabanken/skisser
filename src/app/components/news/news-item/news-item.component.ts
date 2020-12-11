import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})

export class NewsItemComponent implements OnInit {

  postId: number;
  post: any;
  pageTitle: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.postId = this.route.snapshot.params["postId"];
  }

  ngOnInit(): void {

    this.dataService.getNewsItemById(this.postId).subscribe(post => {
      this.post = post;
      this.pageTitle = post.title;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
    });
  }

}
