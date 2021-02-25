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
  pageKey: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private http: HttpClient
  ) {
    this.aboutPageId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.http.get<any>('https://artsdatabanken.no/api/Content/' + this.aboutPageId).subscribe(res => {

      let page: AboutPage;
      let subPages: AboutPage[] = [];

      res.Content.forEach(element => {

        page = {
          id: element.Id.replace('Nodes/', ''),
          url: element.Url.replace('/Pages/', ''),
          heading: element.Heading,
          intro: element.Intro,
          body: element.Body,
          title: element.Title,
          languages: element.Languages[0]
        }

        subPages.push(page);

      });

      this.aboutPage = {
        id: res.Id,
        url: res.Url.replace('/Pages/', ''),
        heading: res.Heading,
        intro: res.Intro,
        body: res.Body,
        content: subPages,
        title: res.Title,
        languages: res.Languages[0]
      };

      this.pageTitle = res.Heading;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

    });

  }

  getAccordionHeaderId(id: number): string {
    return `accordion-header-${id}`;

    /* Functions that return values are allowed in the template */
  }

  getAccordionPanelId(id: number): string {
    return `accordion-panel-${id}`;
  }

}
