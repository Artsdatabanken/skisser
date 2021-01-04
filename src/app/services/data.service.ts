import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { AboutItem } from '../models/aboutItem';
import { NewsItem } from '../models/newsItem';
import { environment } from '../../environments/environment';
import { FeaturedImage } from '../models/featuredImage';
import { Article } from '../models/article';
import { ArticleImage } from '../models/articleImage';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // // bouvet
  // wordpressPostApi: string = 'http://localhost:10004/wp-json/wp/v2/posts?_embed';
  // wordpressSinglePostApi: string = 'http://localhost:10004/wp-json/wp/v2/posts/';

  // // home
  // wpPostsApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/posts?_embed';
  // wpSinglePostApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/posts/';
  // wpPagesApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/pages';
  // wpSinglePageApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/pages/';

  errorMessage: string;

  environmentWpApi: string;
  wpPostsApi: string = 'wp-json/wp/v2/posts'; // husk at ?_embed må være med for å få med bilde og annet
  wpPagesApi: string = 'wp-json/wp/v2/pages';
  strapiApi: string = 'http://localhost:1337/articles';

  constructor(private http: HttpClient) { this.environmentWpApi = environment.wpApiEndpoint; }

  // strapi

  getNews2(langCode: string | null = 'no'): Observable<Article[]> {

    return this.http.get(this.strapiApi).pipe(
      map((res: any[]) => {

        console.log('strapi', res);

        const filteredRes = res.filter(i => i.LANGUAGE === langCode);
        const articles: Article[] = [];

        filteredRes.forEach(data => {

          let articleImage: ArticleImage;

          if (data.hasOwnProperty('Image')) {
            articleImage = {
              id: data['Image'].id,
              alternativeText: data['Image']['alternativeText'],
              caption: data['Image']['caption'],
              sourceUrl: data['Image']['url']
            }
          }
          else {
            articleImage = null;
          }

          const article: Article = {
            id: data.id,
            url: data.id,
            title: data.Title,
            subtitle: data.Subtitle,
            excerpt: data.Excerpt,
            ingress: data.Ingress,
            created: data.created_at,
            published: data.published_at,
            updated: data.updated_at,
            body: data.Body,
            image: articleImage
          }

          articles.push(article);

        });

        return articles;
      }),
      publishReplay(1),
      refCount()
    );

  }

  getNewsItemById2(articleId: number): Observable<Article> {
    return this.http.get(this.strapiApi + '/' + articleId).pipe(
      map((data: any) => {

        let articleImage: ArticleImage;

        if (data.hasOwnProperty('Image')) {
          articleImage = {
            id: data['Image'].id,
            alternativeText: data['Image']['alternativeText'],
            caption: data['Image']['caption'],
            sourceUrl: data['Image']['url']
          }
        }
        else {
          articleImage = null;
        }

        const article: Article = {
          id: data.id,
          url: data.id,
          title: data.Title,
          subtitle: data.Subtitle,
          excerpt: data.Excerpt,
          ingress: data.Ingress,
          created: data.created_at,
          published: data.published_at,
          updated: data.updated_at,
          body: data.Body,
          image: articleImage
        }

        return article;
      })
    )
  }

  // wordpress

  getNews(): Observable<NewsItem[]> {

    return this.http.get(this.environmentWpApi + this.wpPostsApi + '?_embed').pipe(
      map((res: any[]) => {

        console.log('wordpress', res);

        const news: NewsItem[] = [];

        res.forEach(post => {

          let featuredImage: FeaturedImage;
          let featuredImageUrl: string;

          if (post._embedded.hasOwnProperty('wp:featuredmedia')) {

            featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
            featuredImage = {
              id: post._embedded['wp:featuredmedia'][0]['id'],
              altText: post._embedded['wp:featuredmedia'][0]['alt_text'],
              caption: post._embedded['wp:featuredmedia'][0]['caption'],
              title: post._embedded['wp:featuredmedia'][0]['title'],
              slug: post._embedded['wp:featuredmedia'][0]['slug'],
              sourceUrl: post._embedded['wp:featuredmedia'][0]['source_url'],
            }
          }
          else {
            featuredImageUrl = '';
            featuredImage = null;
          }

          const newsItem: NewsItem = {
            url: post.id,
            title: post.title.rendered,
            date: post.date,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered,
            imgUrl: featuredImageUrl,
            featuredImage: featuredImage
          }

          news.push(newsItem);

        });

        return news;
      }),
      publishReplay(1), // Cache the latest emitted
      refCount(), // Keep alive as long as there are subscribers
      catchError(error => {

        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        }
        else {
          this.errorMessage = this.getServerErrorMessage(error);
        }

        return throwError(this.errorMessage);
      })
    );

  }

  getNewsItemById(postId: number): Observable<NewsItem> {
    return this.http.get(this.environmentWpApi + this.wpPostsApi + '/' + postId + '?_embed').pipe(
      map((post: any) => {

        console.log('post', post)

        let featuredImage: FeaturedImage;
        let featuredImageUrl: string;

        if (post._embedded.hasOwnProperty('wp:featuredmedia')) {

          featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
          featuredImage = {
            id: post._embedded['wp:featuredmedia'][0]['id'],
            altText: post._embedded['wp:featuredmedia'][0]['alt_text'],
            caption: post._embedded['wp:featuredmedia'][0]['caption'].rendered,
            title: post._embedded['wp:featuredmedia'][0]['title'],
            slug: post._embedded['wp:featuredmedia'][0]['slug'],
            sourceUrl: post._embedded['wp:featuredmedia'][0]['source_url'],
          }
        }
        else {
          featuredImageUrl = '';
          featuredImage = null;
        }

        const newsItem: NewsItem = {
          url: post.id,
          title: post.title.rendered,
          date: post.date,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          imgUrl: featuredImageUrl,
          featuredImage: featuredImage
        }

        return newsItem;
      }),
      publishReplay(1), // Cache the latest emitted
      refCount(), // Keep alive as long as there are subscribers
      catchError(error => {

        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        }
        else {
          this.errorMessage = this.getServerErrorMessage(error);
        }

        return throwError(this.errorMessage);
      })
    )
  }

  getAboutItems(): Observable<AboutItem[]> {

    return this.http.get(this.environmentWpApi + this.wpPagesApi).pipe(
      map((res: any[]) => {

        console.log('About items', res);

        const aboutfilteredRes: AboutItem[] = [];

        res.forEach(page => {

          const aboutItem: AboutItem = {
            url: page.id,
            slug: page.slug,
            order: page.menu_order,
            title: page.title.rendered,
            date: page.date,
            content: page.content.rendered,
            excerpt: page.excerpt.rendered
          }

          aboutfilteredRes.push(aboutItem);

        });

        console.log('about', aboutfilteredRes)

        return aboutfilteredRes.sort((a, b) => (a.order > b.order) ? 1 : -1);
      })
    );

  }

  getAboutItemById(pageId: number): Observable<AboutItem> {
    return this.http.get(this.environmentWpApi + this.wpPagesApi + '/' + pageId).pipe(
      map((page: any) => {

        console.log('page', page)

        let content: string;

        if (page.content.rendered === '') {
          content = 'N/A';
        }
        else {
          content = page.content.rendered;
        }

        const aboutItem: AboutItem = {
          url: page.id,
          slug: page.slug,
          order: page.menu_order,
          title: page.title.rendered,
          date: page.date,
          content: content,
          excerpt: page.excerpt.rendered,
        }

        return aboutItem;
      })
    )
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }

  getMammalSightings(): Observable<any[]> {

    return this.http.get('http://hotline.whalemuseum.org/api.json').pipe(
      map((res: any[]) => {

        //console.log('sightings', res);

        return res;
        
      }),
      publishReplay(1), // Cache the latest emitted
      refCount(), // Keep alive as long as there are subscribers
      catchError(error => {

        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        }
        else {
          this.errorMessage = this.getServerErrorMessage(error);
        }

        return throwError(this.errorMessage);
      })
    );

  }

}
