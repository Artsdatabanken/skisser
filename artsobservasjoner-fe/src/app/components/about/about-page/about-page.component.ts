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

  private dictionaryX: object = {
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

  private dictionary3: string[] = [
    '305438|303936',
    '305407|305425',
    '305439|303934',
    '305441|303935',
    '305440|303933',
  ];

  private dictionary4: any[] = [
    { id: '305438|303936' },
    { id: '305407|305425' },
    { id: '305439|303934' },
    { id: '305441|303935' },
    { id: '305440|303933' },
  ];

  private dictionary: object = {
    305438: '303936',
    305407: '305425',
    305439: '303934',
    305441: '303935',
    305440: '303933',
    303936: '305438',
    305425: '305407',
    303934: '305439',
    303935: '305441',
    303933: '305440'
  }

  private dictionary2: object = {
    no: {
      305438: '303936',
      305407: '305425',
      305439: '303934',
      305441: '303935',
      305440: '303933'
    },
    en: {
      303936: '305438',
      305425: '305407',
      303934: '305439',
      303935: '305441',
      303933: '305440'
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

    // console.log('TEST en', this.dictionary2['en'][this.aboutPageId])
    // console.log('TEST no', this.dictionary2['no'][this.aboutPageId])


    //------------------------------------------------------------------------------------

    // const getKey = (val: any, language: string): string | any => {
    //   const res = Object.entries(this.dictionary[language]).filter(([k, v]) => val == v).map(([k, v]) => k);
    //   return res[0] || false;
    // };

    let newId: any = this.dictionary2[this.translate.currentLang][this.aboutPageId];

    this.translate.onLangChange.subscribe(res => {

      //this.router.navigateByUrl('/about/' + newId);
      // console.log('onlangchange', res.lang)

      // res.lang === 'no' ? newId = this.dictionary2['no'][this.aboutPageId] : this.aboutPageId;
      // res.lang === 'en' ? newId = this.dictionary2['en'][this.aboutPageId] : this.aboutPageId;

      // console.log('newid onlangchange', newId)

    });

    // console.log('newid', newId)


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
