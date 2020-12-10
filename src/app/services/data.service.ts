import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { NewsItem } from '../models/newsItem';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  configUrl1: string = 'https://artsobs-stats.free.beeceptor.com';
  apiUrl: string = 'https://reqres.in/api/users?page=2';
  wordpressApi: string = 'http://localhost:10004/wp-json/wp/v2/posts';

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

    return this.http.get(this.wordpressApi).pipe(
      map((res: any[]) => {
        console.log('response', res);
        console.log('typeof res', typeof res);

        const news: NewsItem[] = [];

        res.forEach(post => {

          const newsItem: NewsItem = {
            title: post.title.rendered,
            date: post.date,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered
          }

          news.push(newsItem);

        });

        return news;
      })
    );

  }

}
