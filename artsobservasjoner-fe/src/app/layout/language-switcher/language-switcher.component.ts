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

  constructor(
    public translationService: TranslationService,
    public translate: TranslateService
  ) {

    this.subscription.push(this.translationService.selectedLanguage.subscribe((value) => {
      this.selectedLanguage = value;
    }));

    this.subscription.push(this.translationService.unselectedLanguage.subscribe((value) => {
      this.nonSelectedLanguage = value;
    }));

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  switchLanguage(selectedLanguageCode: string): void {
    console.log('selected language in switcher', selectedLanguageCode);
    this.translationService.switchLanguage(selectedLanguageCode);
  }

  // if we use dropdown / select
  // onChange(selectedLanguageCode: string): void {
  //   console.log('selected', selectedLanguageCode);
  //   this.translationService.changeLanguage(selectedLanguageCode);
  //   //window.location.href = `/${selectedLangCode}`
  // }

}
