import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AboutPage } from 'src/app/models/aboutPage';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})

export class AboutPageComponent implements OnInit {

  aboutPageId: number;
  aboutPage: AboutPage;
  pageTitle: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private http: HttpClient
  ) {
    this.aboutPageId = this.route.snapshot.params["pageId"];
  }

  ngOnInit(): void {

    this.http.get<any>('https://artsdatabanken.no/api/Content/' + this.aboutPageId).subscribe(res => {

      this.aboutPage = {
        id: res.Id,
        url: res.Url.replace('/Pages/', ''),
        heading: res.Heading,
        intro: res.Intro,
        body: res.Body,
        content: res.Content,
        title: res.Title,
        languages: res.Languages[0]
      };

      console.log('sdjhfgsdf', res)
      console.log('sdjhfgsdf', this.aboutPage)

      this.pageTitle = res.Heading;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

    });

  }

}
