import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  public currentLanguage$ = new BehaviorSubject(localStorage.getItem('LANGUAGE') || this.translate.currentLang);

  constructor(private translate: TranslateService) { }

  switchLanguage(selectedLanguageCode: string): void {
    localStorage.setItem('LANGUAGE', selectedLanguageCode);
    this.translate.use(selectedLanguageCode); // IMPORTANT 
    this.currentLanguage$.next(selectedLanguageCode);
  }

  handleLanguage(): void {

    // DEFINE SUPPORTED LANGUAGES
    this.translate.addLangs(['no', 'en']);

    // DEFINE AND USE DEFAULT LANGUAGE
    // this.translate.setTranslation('no', defaultLanguage);

    if (localStorage.getItem('LANGUAGE')) {
      this.translate.setDefaultLang(localStorage.getItem('LANGUAGE'));
      this.translate.use(localStorage.getItem('LANGUAGE'));
    }
    else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('LANGUAGE', 'en');
    }

  }

  // getCurrentLanguage(): Observable<string> {

  //   this.currentLanguage$.next(localStorage.getItem('LANGUAGE') || this.translate.currentLang);

  //   this.translate.onLangChange.subscribe(l => {
  //     this.currentLanguage$.next(l.lang);
  //   });

  //   return this.currentLanguage$;
  // }

}
