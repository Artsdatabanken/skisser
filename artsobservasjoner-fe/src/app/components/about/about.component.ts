import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import Settings from 'src/app/data/settings.json';
import { AboutPage } from 'src/app/models/aboutPage';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  errorMessage: string;
  aboutPages: AboutPage[] = [];
  ids: string[] = Settings.drupalIds;
  selectedLanguage: string;
  subscription: Subscription;

  constructor(private dataService: DataService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.getAboutPages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAboutPages(): void {

    let tempAboutPages: AboutPage[] = [];

    this.ids.forEach(id => {

      this.subscription = this.dataService.getAboutPagesById(+id).subscribe(res => {

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
            languages: r.languages,
            order: r.order
          };

          // this.aboutPages.push(aboutPage);
          tempAboutPages.push(aboutPage);

        });

        tempAboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

        if (this.translate.currentLang == 'no') {
          this.aboutPages = tempAboutPages.filter(d => d.languages == 'nb');
        }
        else {
          this.aboutPages = tempAboutPages.filter(d => d.languages == 'en');
        }

        this.translate.onLangChange.subscribe(r => {

          if (r.lang == 'no') {
            this.aboutPages = tempAboutPages.filter(d => d['languages'] == 'nb');
          }

          if (r.lang == 'en') {
            this.aboutPages = tempAboutPages.filter(d => d['languages'] == 'en');
          }

        });

        // console.log('nb', this.aboutPages.filter(d => d['languages'] == 'nb'))
        // console.log('en', this.aboutPages.filter(d => d['languages'] == 'en'))

        this.aboutPages = this.aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      });

    });


  }

    getAboutPageUrl(slug: string): string {
    return `about/${slug}`;
  }

}
