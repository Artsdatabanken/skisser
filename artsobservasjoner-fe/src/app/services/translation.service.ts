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

  // getCurrentLanguage(): Observable<string> {

  //   this.currentLanguage$.next(localStorage.getItem('LANGUAGE') || this.translate.currentLang);

  //   this.translate.onLangChange.subscribe(l => {
  //     this.currentLanguage$.next(l.lang);
  //   });

  //   return this.currentLanguage$;
  // }

}
