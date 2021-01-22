import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  chosenLanguage: string = '';
  subscription: Subscription;

  loremIpsum: string = 'Etiam eleifend felis sed tristique suscipit. Nullam accumsan laoreet velit, sagittis in at nullam molestie placerat ex';

  // siteLanguage: string;
  // siteLocale: string;

  // languageList: object[] = [
  //   { code: 'no', label: 'Norsk' },
  //   { code: 'en', label: 'English' },
  //   { code: 'es', label: 'Español' },
  // ]

  constructor(public translationService: TranslationService) {
    // this.subscription = this.translationService.chosenLanguage.subscribe((value) => {
    //   this.chosenLanguage = value;
    // });
  }

  ngOnInit(): void {

    //this.translationService.getTranslation().subscribe(t => console.log('translation response in component', t));

    // this.siteLocale = window.location.pathname.split('/')[1];

    // this.siteLanguage = this.languageList.find(
    //   (f) => {
    //     f['code'] === this.siteLocale;
    //   }
    // )?.['label'];

    // if (!this.siteLanguage) {
    //   //this.onChange(this.languageList[0].code)
    // }    

  }

  // onChange(selectedLangCode: string) {
  //   console.log('chosen', selectedLangCode);
  //   this.translationService.changeLanguage(selectedLangCode);
  //   //window.location.href = `/${selectedLangCode}`
  // }

}
