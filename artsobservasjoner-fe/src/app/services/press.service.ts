import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import Settings from '../config/settings.json';
import { Announcement, NewsItem } from '../models/press';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})

export class PressService {

  ids: string[] = Settings.drupalIds;
  errorMessage: string;

  // APIs

  readonly drupalNews: string = 'https://artsdatabanken.no/api/Resource/?Collection=Nodes/309451';
  readonly drupalAPIItem: string = 'https://artsdatabanken.no/api/Resource/Nodes/';
  readonly announcementsApi: string = 'https://artsdatabanken.no/api/Resource/?Tags=Varsel,Kunngj%C3%B8ring';
  readonly newsApi: string = 'https://artsdatabanken.no/api/Resource/?Tags=Nyhet';

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) { }


  getAnnouncements(): Observable<Announcement[]> {

    return this.http.get(this.announcementsApi).pipe(
      map((response: any[]) => {

        const announcements: Announcement[] = [];
        let tag: string;

        response.forEach(data => {

          // create object tags property
          data.Tags.slice(-1)[0] === 'Varsel' ? tag = 'notice' : tag = 'announcement';

          const announcement: Announcement = {
            id: data.Id.replace('Nodes/', ''),
            url: data.Id.replace('Nodes/', ''),
            title: data.Name,
            heading: data.Heading,
            updated: data.Changed,
            published: data.Published,
            body: data.Body,
            //tags: data.Tags.slice(-1)[0]
            tags: tag
          }

          announcements.push(announcement);

        });

        return announcements.sort((a: Announcement, b: Announcement) => this.utilitiesService.getTime(b.published) - this.utilitiesService.getTime(a.published));

      }),
      publishReplay(1),
      refCount()
    );

  }

  getAnnouncementById(id: number): Observable<Announcement> {

    return this.http.get(this.drupalAPIItem + '/' + id).pipe(
      map((response: any) => {

        const announcement: Announcement = {
          id: response.Id.replace('Nodes/', ''),
          url: response.Id.replace('Nodes/', ''),
          title: response.Name,
          heading: response.Heading,
          updated: response.Changed,
          published: response.Published,
          body: response.Body
        }

        return announcement;
      }),
      publishReplay(1),
      refCount()
    );
  }

  getNews(): Observable<NewsItem[]> {

    return this.http.get(this.newsApi).pipe(
      map((response: any[]) => {

        const news: NewsItem[] = [];

        response.forEach(data => {

          const newsItem: NewsItem = {
            id: data.Id.replace('Nodes/', ''),
            url: data.Id.replace('Nodes/', ''),
            title: data.Name,
            heading: data.Heading,
            intro: data.Intro,
            created: data.Created,
            updated: data.Changed,
            published: data.Published,
            body: data.Body
          }

          news.push(newsItem);

        });

        return news.sort((a: NewsItem, b: NewsItem) => this.utilitiesService.getTime(b.created) - this.utilitiesService.getTime(a.created));

      }),
      publishReplay(1),
      refCount()
    );

  }

  getNewsItemById(id: number): Observable<NewsItem> {

    return this.http.get(this.drupalAPIItem + '/' + id).pipe(
      map((response: any) => {

        const newsItem: NewsItem = {
          id: response.Id.replace('Nodes/', ''),
          url: response.Id.replace('Nodes/', ''),
          title: response.Name,
          heading: response.Heading,
          intro: response.Intro,
          created: response.Created,
          updated: response.Changed,
          published: response.Published,
          body: response.Body
        }

        return newsItem;
      }),
      publishReplay(1),
      refCount()
    );
  }

}
