import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Norwegian from '../../assets/i18n/no.json';
import English from '../../assets/i18n/en.json';
import { map, shareReplay } from 'rxjs/operators';

export interface LanguageItem {
  languageCode?: string;
  group?: string;
  label?: string;
  value?: string;
}

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  translationApi: string = 'https://ao3-resourcesapi.test.artsobservasjoner.no/api/v1/Resources';
  errorMessage: string;

  norwegian = Norwegian;
  english = English;

  public currentLanguage$: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('LANGUAGE') || this.translate.currentLang);

  constructor(
    private translate: TranslateService,
    private httpClient: HttpClient
  ) { }

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

  getLanguageItemFromJson(): Observable<LanguageItem> {

    let languageItem: LanguageItem = {};

    return of(this.english).pipe(
      map((response: any) => {

        for (let [key, value] of Object.entries(response)) {
          // console.log('TEST', `${key}: ${value}`);

          for (let [key2, value2] of Object.entries(value)) {

            languageItem = {
              languageCode: 'en',
              group: key,
              label: key2,
              value: value2
            }

            this.setLanguageItem(languageItem).subscribe();

          }

        }

        return languageItem;
      })
    );

  }

  setLanguageItem(languageItem: LanguageItem): Observable<any | null> {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }

    return this.httpClient.post(this.translationApi, JSON.stringify(languageItem), options);

  }

  // getLanguageKeys(): Observable<any> {
  //   return this.httpClient.get()
  // }

  getTranslations(languageCode: string): Observable<any> {

    let lCode: string;

    if (languageCode === 'no') lCode = 'nb';
    if (languageCode === 'en') lCode = 'en'; 

    return this.httpClient.get(this.translationApi + '?languageCode=' + lCode).pipe(
      map((response: any) => {

        console.log('språk', response)


      }),
      shareReplay()
    );

  }

}


