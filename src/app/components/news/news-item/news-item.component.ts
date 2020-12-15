import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleImage } from 'src/app/models/articleImage';
import { FeaturedImage } from 'src/app/models/featuredImage';
import { NewsItem } from 'src/app/models/newsItem';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})

export class NewsItemComponent implements OnInit {

  pageTitle: string;

  // wordpress
  postId: number;
  post: NewsItem;
  featuredImage: FeaturedImage;

  // strapi
  articleId: number;
  article: Article;
  image: ArticleImage;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.postId = this.route.snapshot.params["postId"];
    this.articleId = this.route.snapshot.params["postId"];
  }

  ngOnInit(): void {

    this.dataService.getNewsItemById(this.postId).subscribe(post => {
      this.post = post;
      this.pageTitle = post.title;
      this.featuredImage = post.featuredImage;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
    });

    this.dataService.getNewsItemById2(this.articleId).subscribe(article => {
      this.article = article;
      this.pageTitle = article.title;
      this.image = article.image;
      this.imageUrl = `http://localhost:1337${article.image.sourceUrl}`;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
    });

  }

}
