import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})

export class LanguageSwitcherComponent implements OnInit {

  selectedLanguage: string;
  subscription: Subscription[] = [];
  nonSelectedLanguage: object;
  currentLanguage: string;

  constructor(
    public translationService: TranslationService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang;
   }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  switchLanguage(selectedLanguageCode: string): void {
    this.currentLanguage = selectedLanguageCode;
    this.translationService.switchLanguage(selectedLanguageCode);
  }

  // if we use dropdown / select
  // onChange(selectedLanguageCode: string): void {
  //   console.log('selected', selectedLanguageCode);
  //   this.translationService.changeLanguage(selectedLanguageCode);
  //   //window.location.href = `/${selectedLangCode}`
  // }

}
