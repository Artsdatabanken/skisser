import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import Settings from '../data/settings.json';
import { NewsItem } from '../models/newsItem';
import { environment } from '../../environments/environment';
import { FeaturedImage } from '../models/featuredImage';
import { AboutPage } from '../models/aboutPage';

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

  ids: string[] = Settings.drupalIds;
  errorMessage: string;

  // APIs
  // environmentWpApi: string;
  // wpPostsApi: string = 'wp-json/wp/v2/posts'; // husk at ?_embed må være med for å få med bilde og annet
  // wpPagesApi: string = 'wp-json/wp/v2/pages';
  // strapiApi: string = 'http://localhost:1337/articles';
  oldNews: string = 'https://artsdatabanken.no/api/Resource/?Tags=Artsobservasjoner';
  oldNewsItem: string = 'https://artsdatabanken.no/api/Resource/Nodes/';

  constructor(private http: HttpClient) {
    //this.environmentWpApi = environment.wpApiEndpoint;
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

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  //----------------------------------------------------------------------------****

  getNews(langCode: string | null = 'no'): Observable<NewsItem[]> {

    return this.http.get(this.oldNews).pipe(
      map((res: any[]) => {

        console.log('res', res)

        ///const filteredRes = res.filter(i => i.LANGUAGE === langCode);
        const filteredRes = res;
        const news: NewsItem[] = [];

        filteredRes.forEach(data => {

          // image handling
          if (data.Content !== undefined) {

            console.log('data content ??????????', data.Content)

            data.Content.forEach(element => {
              this.getNewsItemImages(element.replace('Nodes/', ''));
            });

          }

          const newsItem: NewsItem = {
            id: data.Id.replace('Nodes/', ''),
            url: data.Id.replace('Nodes/', ''),
            title: data.Name,
            heading: data.Heading,
            intro: data.Intro,
            created: data.Created,
            updated: data.Changed,
            published: data.Published,
            body: data.Body,
            imgUrl: null,
            image: null // articleImage
          }

          news.push(newsItem);

        });

        return news.sort((a: NewsItem, b: NewsItem) => this.getTime(b.created) - this.getTime(a.created));

      }),
      publishReplay(1),
      refCount()
    );

  }

  getNewsItemImages(id: number): Observable<FeaturedImage> {
    return this.http.get<any>(this.oldNewsItem + id).pipe(
      map((data: any) => {

        console.log('img', data)

        const img: FeaturedImage = {
          id: data.Id.replace('Nodes/', ''),
          altText: data.Name,
          caption: data.Body,
          title: data.Name,
          sourceUrl: ''
        }

        return img;
      }),
      publishReplay(1),
      refCount()
    );
  }

  getNewsItemById(id: number): Observable<NewsItem> {

    return this.http.get(this.oldNewsItem + '/' + id).pipe(
      map((data: any) => {

        const newsItem: NewsItem = {
          id: data.Id.replace('Nodes/', ''),
          url: data.Id.replace('Nodes/', ''),
          title: data.Name,
          heading: data.Heading,
          intro: data.Intro,
          created: data.Created,
          updated: data.Changed,
          published: data.Published,
          body: data.Body,
          imgUrl: null,
          image: null // articleImage
        }

        return newsItem;
      }),
      publishReplay(1),
      refCount()
    );
  }

  // strapi

  // getNews2(langCode: string | null = 'no'): Observable<Article[]> {

  //   return this.http.get(this.strapiApi).pipe(
  //     map((res: any[]) => {

  //       console.log('strapi', res);

  //       const filteredRes = res.filter(i => i.LANGUAGE === langCode);
  //       const articles: Article[] = [];

  //       filteredRes.forEach(data => {

  //         let articleImage: ArticleImage;

  //         if (data.hasOwnProperty('Image')) {
  //           articleImage = {
  //             id: data['Image'].id,
  //             alternativeText: data['Image']['alternativeText'],
  //             caption: data['Image']['caption'],
  //             sourceUrl: data['Image']['url']
  //           }
  //         }
  //         else {
  //           articleImage = null;
  //         }

  //         const article: Article = {
  //           id: data.id,
  //           url: data.id,
  //           title: data.Title,
  //           subtitle: data.Subtitle,
  //           excerpt: data.Excerpt,
  //           ingress: data.Ingress,
  //           created: data.created_at,
  //           published: data.published_at,
  //           updated: data.updated_at,
  //           body: data.Body,
  //           image: articleImage
  //         }

  //         articles.push(article);

  //       });

  //       return articles;
  //     }),
  //     publishReplay(1),
  //     refCount()
  //   );

  // }

  // getNewsItemById2(articleId: number): Observable<Article> {
  //   return this.http.get(this.strapiApi + '/' + articleId).pipe(
  //     map((data: any) => {

  //       let articleImage: ArticleImage;

  //       if (data.hasOwnProperty('Image')) {
  //         articleImage = {
  //           id: data['Image'].id,
  //           alternativeText: data['Image']['alternativeText'],
  //           caption: data['Image']['caption'],
  //           sourceUrl: data['Image']['url']
  //         }
  //       }
  //       else {
  //         articleImage = null;
  //       }

  //       const article: Article = {
  //         id: data.id,
  //         url: data.id,
  //         title: data.Title,
  //         subtitle: data.Subtitle,
  //         excerpt: data.Excerpt,
  //         ingress: data.Ingress,
  //         created: data.created_at,
  //         published: data.published_at,
  //         updated: data.updated_at,
  //         body: data.Body,
  //         image: articleImage
  //       }

  //       return article;
  //     })
  //   )
  // }

  // wordpress

  // getNews1(): Observable<NewsItem[]> {

  //   return this.http.get(this.environmentWpApi + this.wpPostsApi + '?_embed').pipe(
  //     map((res: any[]) => {

  //       console.log('wordpress', res);

  //       const news: NewsItem[] = [];

  //       res.forEach(post => {

  //         let featuredImage: FeaturedImage;
  //         let featuredImageUrl: string;

  //         if (post._embedded.hasOwnProperty('wp:featuredmedia')) {

  //           featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
  //           featuredImage = {
  //             id: post._embedded['wp:featuredmedia'][0]['id'],
  //             altText: post._embedded['wp:featuredmedia'][0]['alt_text'],
  //             caption: post._embedded['wp:featuredmedia'][0]['caption'],
  //             title: post._embedded['wp:featuredmedia'][0]['title'],
  //             slug: post._embedded['wp:featuredmedia'][0]['slug'],
  //             sourceUrl: post._embedded['wp:featuredmedia'][0]['source_url'],
  //           }
  //         }
  //         else {
  //           featuredImageUrl = '';
  //           featuredImage = null;
  //         }

  //         const newsItem: NewsItem = {
  //           url: post.id,
  //           title: post.title.rendered,
  //           date: post.date,
  //           content: post.content.rendered,
  //           excerpt: post.excerpt.rendered,
  //           imgUrl: featuredImageUrl,
  //           featuredImage: featuredImage
  //         }

  //         news.push(newsItem);

  //       });

  //       return news;
  //     }),
  //     publishReplay(1), // Cache the latest emitted
  //     refCount(), // Keep alive as long as there are subscribers
  //     catchError(error => {

  //       if (error.error instanceof ErrorEvent) {
  //         this.errorMessage = `Error: ${error.error.message}`;
  //       }
  //       else {
  //         this.errorMessage = this.getServerErrorMessage(error);
  //       }

  //       return throwError(this.errorMessage);
  //     })
  //   );

  // }

  // getNewsItemById1(postId: number): Observable<NewsItem> {
  //   return this.http.get(this.environmentWpApi + this.wpPostsApi + '/' + postId + '?_embed').pipe(
  //     map((post: any) => {

  //       console.log('post', post)

  //       let featuredImage: FeaturedImage;
  //       let featuredImageUrl: string;

  //       if (post._embedded.hasOwnProperty('wp:featuredmedia')) {

  //         featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
  //         featuredImage = {
  //           id: post._embedded['wp:featuredmedia'][0]['id'],
  //           altText: post._embedded['wp:featuredmedia'][0]['alt_text'],
  //           caption: post._embedded['wp:featuredmedia'][0]['caption'].rendered,
  //           title: post._embedded['wp:featuredmedia'][0]['title'],
  //           slug: post._embedded['wp:featuredmedia'][0]['slug'],
  //           sourceUrl: post._embedded['wp:featuredmedia'][0]['source_url'],
  //         }
  //       }
  //       else {
  //         featuredImageUrl = '';
  //         featuredImage = null;
  //       }

  //       const newsItem: NewsItem = {
  //         url: post.id,
  //         title: post.title.rendered,
  //         date: post.date,
  //         content: post.content.rendered,
  //         excerpt: post.excerpt.rendered,
  //         imgUrl: featuredImageUrl,
  //         featuredImage: featuredImage
  //       }

  //       return newsItem;
  //     }),
  //     publishReplay(1), // Cache the latest emitted
  //     refCount(), // Keep alive as long as there are subscribers
  //     catchError(error => {

  //       if (error.error instanceof ErrorEvent) {
  //         this.errorMessage = `Error: ${error.error.message}`;
  //       }
  //       else {
  //         this.errorMessage = this.getServerErrorMessage(error);
  //       }

  //       return throwError(this.errorMessage);
  //     })
  //   )
  // }

  getAboutPagesById(id: number): Observable<AboutPage[]> {

    let aboutPages: AboutPage[] = [];

    return this.http.get<any>('https://artsdatabanken.no/api/Content/' + id).pipe(
      map(res => {

        //console.log('res', res)

        let order: number;

        if (res.Metadata[0].Label) {
          order = +res.Metadata[0].Label;
        }
        else {
          order = 0;
        }

        aboutPages.push({
          id: res.Id,
          url: res.Url.replace('/Pages/', ''),
          heading: res.Heading,
          intro: res.Intro,
          body: res.Body,
          content: res.Content,
          title: res.Title,
          languages: null,
          order: order
        });

        return aboutPages = aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      }),
      publishReplay(1),
      refCount()
    );

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
