import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})

export class LanguageSwitcherComponent implements OnInit {

  selectedLanguage: string;
  subscription: Subscription;

  constructor(public translationService: TranslationService) {
    
    this.subscription = this.translationService.selectedLanguage.subscribe((value) => {
      this.selectedLanguage = value;
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(selectedLanguageCode: string): void {
    console.log('selected', selectedLanguageCode);
    this.translationService.changeLanguage(selectedLanguageCode);
    //window.location.href = `/${selectedLangCode}`
  }

}
