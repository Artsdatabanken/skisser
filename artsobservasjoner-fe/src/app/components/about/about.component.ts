import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Settings from 'src/app/data/settings.json';
import { AboutPage } from 'src/app/models/aboutPage';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  errorMessage: string;
  aboutPages: AboutPage[] = [];
  ids: string[] = Settings.drupalIds;

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getAboutPages();
  }

  getAboutPages(): void {

    this.ids.forEach(id => {

      this.dataService.getAboutPagesById(+id).subscribe(res => {

        let aboutPage: AboutPage;

        res.forEach(r => {

          aboutPage = {
            id: r.id,
            url: r.url,
            heading: r.heading,
            intro: r.intro,
            body: r.body,
            content: r.content,
            title: r.title,
            languages: null,
            order: r.order
          };

          this.aboutPages.push(aboutPage);

        });

        this.aboutPages = this.aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      });

    });

  }

  // getAboutPages(): void {

  //   this.ids.forEach(id => {

  //     return this.http.get<any>('https://artsdatabanken.no/api/Content/' + id).subscribe(res => {

  //       console.log('res', res)

  //       let order: number;

  //       if (res.Metadata[0].Label) {
  //         order = +res.Metadata[0].Label;
  //       }
  //       else {
  //         order = 0;
  //       }

  //       this.aboutPages.push({
  //         id: res.Id,
  //         url: res.Url.replace('/Pages/', ''),
  //         heading: res.Heading,
  //         intro: res.Intro,
  //         body: res.Body,
  //         content: res.Content,
  //         title: res.Title,
  //         languages: null,
  //         order: order
  //       });

  //       this.aboutPages = this.aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

  //     });
  //   });

  // }

  getAboutPageUrl(slug: string): string {
    return `about/${slug}`;
  }

}
