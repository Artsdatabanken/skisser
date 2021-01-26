import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private dataService: DataService, private translate: TranslateService) { }

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
            languages: r.languages,
            order: r.order
          };

          this.aboutPages.push(aboutPage);

        });

        console.log('aboutPages', this.aboutPages)

        if (this.translate.currentLang == 'no') {
          this.aboutPages = this.aboutPages.filter(d => d.languages == 'nb');
        }
        else {
          this.aboutPages = this.aboutPages.filter(d => d.languages == 'en');
        }



        // this.translate.onLangChange.subscribe(r => {

        //   console.log('are we coming here?', r.lang, 'TEST', r.lang == 'no')

        //   if (r.lang == 'no') {
        //     this.aboutPages = this.aboutPages.filter(d => d['languages'] == 'nb');
        //   }
        //   else {
        //     this.aboutPages = this.aboutPages.filter(d => d['languages'] == 'en');
        //   }

        // });

        console.log('FFFFF', this.aboutPages.filter(d => d['languages'] == 'nb'))

        this.aboutPages = this.aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      });

    });

  }

  getAboutPageUrl(slug: string): string {
    return `about/${slug}`;
  }

}
