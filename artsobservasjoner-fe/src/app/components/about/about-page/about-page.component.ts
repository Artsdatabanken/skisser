import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AboutPage } from 'src/app/models/aboutPage';
import { TranslationSet } from 'src/app/models/translation';

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

  private dictionary: object = {
    no: {
      id1: '303936',
      id2: '305425',
      id3: '303934',
      id4: '303935',
      id5: '303933'
    },
    en: {
      id1: '305438',
      id2: '305407',
      id3: '305439',
      id4: '305441',
      id5: '305440'
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.aboutPageId = this.route.snapshot.params['id'];
  }

  private getPageIdByLanguage(key: string | any, language: string): string {

    if (this.dictionary[language] !== null) {
      return this.dictionary[language].values[key];
    }
    else {
      return this.dictionary['no'].values[key];
    }

  }

  ngOnInit(): void {

    const getKey = (val: any, language: string): string | any => {
      const res = Object.entries(this.dictionary[language]).filter(([k, v]) => val == v).map(([k, v]) => k);
      return res[0] || false;
    };

    this.translate.onLangChange.subscribe(res => {

      console.log('LANGUAGE', res.lang);

      if (res.lang == 'no') {

        console.log('NO', this.dictionary[res.lang])

        console.log('id NO', getKey(this.aboutPageId, 'en'))


        //this.router.navigateByUrl('/about/' + this.getPageIdByLanguage(getKey(this.aboutPageId, 'en'), 'no'));
      }

      if (res.lang == 'en') {

        console.log('EN', this.dictionary[res.lang])
        console.log('id EN', getKey(this.aboutPageId, 'no'))

        //this.router.navigateByUrl('/about/' + this.getPageIdByLanguage(getKey(this.aboutPageId, 'no'), 'en'));
      }

    });


    //****************************************************************************************************************** */

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



      //console.log('RES', res)

      this.pageTitle = res.Heading;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);

    });

    // if (this.translate.currentLang == 'no') {
    //   this.aboutPages = tempAboutPages.filter(d => d.languages == 'nb');
    // }
    // else {
    //   this.aboutPages = tempAboutPages.filter(d => d.languages == 'en');
    // }

    // this.translate.onLangChange.subscribe(r => {

    //   if (r.lang == 'no') {
    //     this.aboutPages = tempAboutPages.filter(d => d['languages'] == 'nb');
    //   }

    //   if (r.lang == 'en') {
    //     this.aboutPages = tempAboutPages.filter(d => d['languages'] == 'en');
    //   }

    // });


  }

  getAccordionHeaderId(id: number): string {
    return `accordion-header-${id}`;

    /* Functions that return values are allowed in the template */
  }

  getAccordionPanelId(id: number): string {
    return `accordion-panel-${id}`;
  }

}
