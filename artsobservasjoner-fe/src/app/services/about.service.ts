import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { AboutPage } from '../models/aboutPage';
import Settings from '../config/settings.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AboutService {

  ids: string[] = Settings.drupalIds;
  errorMessage: string;

  // APIs

  readonly drupalAbout: string = 'https://artsdatabanken.no/api/Resource/?Collection=Nodes/302996';
  
  constructor(private httpClient: HttpClient) { }

  getAboutPagesById(id: number): Observable<AboutPage[]> {

    let aboutPages: AboutPage[] = [];

    return this.httpClient.get<any>('https://artsdatabanken.no/api/Content/' + id).pipe(
      map(response => {

        let order: number = 0;

        if (response.Metadata && response.Metadata.length) {
          order = +response.Metadata[0].Label;
        }
        else {
          order = 0;
        }

        aboutPages.push({
          id: response.Id,
          url: response.Url.replace('/Pages/', ''),
          heading: response.Heading,
          intro: response.Intro,
          body: response.Body,
          content: response.Content,
          title: response.Title,
          languages: response.Languages[0],
          order: order
        });

        return aboutPages = aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      }),
      publishReplay(1),
      refCount()
    );

  }

}
