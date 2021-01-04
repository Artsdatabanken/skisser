import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AboutItem } from 'src/app/models/aboutItem';
import { AboutPage } from 'src/app/models/aboutPage';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  subMenu: any[];
  aboutItems: AboutItem[];
  errorMessage: string;
  data: any;
  aboutPages: AboutPage[] = [];
  ids: string[] = ['201123', '201730', '286637'];

  /*
  aboutArtsObs = '201123';
  supportId = '201730';
  termsOfUseId = '286637'; //'201723';

  deviatingReportsId = '231165';
  fundamentalsId = '201711';
  getStartedId = '201930';
  manualId = '201834';
  guidanceId = '201752';
  faqId = '201906';
  partnersId = '222005';
  systemRequirementsId = '201749';
  glossaryId = '201815';

  */

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('about');

    // this.dataService.getAboutItems().subscribe(
    //   res => {
    //     this.aboutItems = res;
    //   },
    //   error => {
    //     console.log('error', error);
    //   }
    // );

    this.getAboutPage();

  }

  getAboutPage(): any {
    // return this.http.get<any>('https://artsdatabanken.no/api/Content/' + id).subscribe(data => {
    //   console.log('data', data)
    //   this.data = data;
    // });

    this.ids.forEach(id => {
      console.log('id', id)
      return this.http.get<any>('https://artsdatabanken.no/api/Content/' + id).subscribe(res => {
        console.log('res', res)
        this.aboutPages.push({
          id: res.Id,
          url: res.Url.replace('/Pages/', ''),
          heading: res.Heading,
          intro: res.Intro,
          content: res.Content,
          title: res.Title,
          languages: null
        });
        console.log('about pages', this.aboutPages)
      });
    });
  }

  getAboutItemUrl(slug: string): string {
    return `about/${slug}`;
  }

}
