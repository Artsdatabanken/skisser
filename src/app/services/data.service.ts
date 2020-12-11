import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { AboutItem } from '../models/aboutItem';
import { NewsItem } from '../models/newsItem';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  configUrl1: string = 'https://artsobs-stats.free.beeceptor.com';
  apiUrl: string = 'https://reqres.in/api/users?page=2';

  wordpressPostApi: string = 'http://localhost:10004/wp-json/wp/v2/posts?_embed';
  wpPostsApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/posts?_embed';
  wpSinglePostApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/posts/';
  wpPagesApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/pages';
  wpSinglePageApi: string = 'http://artsobservasjoner.local/wp-json/wp/v2/pages/';

  constructor(private http: HttpClient) { }

  getStatsData(): Observable<any> {
    return this.http.get(this.configUrl1).pipe(
      publishReplay(1), // Cache the latest emitted
      refCount() // Keep alive as long as there are subscribers
    );
  }

  getUsers(): Observable<User[]> {

    return this.http.get(this.apiUrl).pipe(

      map((res: any) => {

        const users: User[] = [];

        console.log('res', res)

        res.data.forEach((u: any) => {

          const user: User = {
            firstName: u.first_name,
            lastName: u.last_name
          };

          users.push(user);

        });


        return users;
      })
    );

  }

  getNews(): Observable<NewsItem[]> {

    return this.http.get(this.wpPostsApi).pipe(
      map((res: any[]) => {
        console.log('posts', res);

        const news: NewsItem[] = [];

        res.forEach(post => {

          let featuredImageUrl: string;

          if (post._embedded.hasOwnProperty('wp:featuredmedia')) {
            console.log('yes it does')
            featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
          }

          const newsItem: NewsItem = {
            url: post.id,
            title: post.title.rendered,
            date: post.date,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered,
            imgUrl: featuredImageUrl
          }

          news.push(newsItem);

        });

        return news;
      })
    );

  }

  getNewsItemById(postId: number): Observable<NewsItem> {
    return this.http.get(this.wpSinglePostApi + postId + '?_embed').pipe(
      map((post: any) => {

        console.log('post', post)

        let featuredImageUrl: string;

        if (post._embedded.hasOwnProperty('wp:featuredmedia')) {
          featuredImageUrl = post._embedded['wp:featuredmedia'][0]['source_url'];
        }

        const newsItem: NewsItem = {
          url: post.id,
          title: post.title.rendered,
          date: post.date,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          imgUrl: featuredImageUrl
        }

        return newsItem;
      })
    )
  }

  getAboutItems(): Observable<AboutItem[]> {

    return this.http.get(this.wpPagesApi).pipe(
      map((res: any[]) => {

        console.log('AboutItems', res);

        const aboutItems: AboutItem[] = [];

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

          aboutItems.push(aboutItem);

        });

        console.log('about', aboutItems)

        return aboutItems.sort((a, b) => (a.order > b.order) ? 1 : -1);
      })
    );

  }

  getAboutItemById(pageId: number): Observable<AboutItem> {
    return this.http.get(this.wpPagesApi + '/' + pageId).pipe(
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

}
