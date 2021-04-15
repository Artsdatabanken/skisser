import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import Norwegian from '../../assets/i18n/no.json';
import English from '../../assets/i18n/en.json';
import { catchError, map, tap } from 'rxjs/operators';

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

  translationApi: string = 'https://ao3-resourcesapi-test.azurewebsites.net/api/v1/Resources';
  errorMessage: string;

  norwegian = Norwegian;
  english = English;

  /*
  {
  "languageCode": "nb",
  "group": "string",
  "label": "string",
  "value": "string"
}
*/

  public currentLanguage$ = new BehaviorSubject(localStorage.getItem('LANGUAGE') || this.translate.currentLang);

  constructor(private translate: TranslateService, private httpClient: HttpClient) { }

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

  getLanguageItem(): Observable<LanguageItem[]> {

    let languageItem: LanguageItem = {};
    let languageItems: LanguageItem[] = [];

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

            this.setLanguageKey(languageItem);

            languageItems.push(languageItem);

          }

        }

        // console.log('language item', languageItem)
        // console.log('language items', languageItems)

        return languageItems;
      })
    );

  }

  setLanguageKey(languageItem: LanguageItem): Observable<any | null> {
    
    //console.log('are we even coming here?', JSON.stringify(languageItem));

    return this.httpClient.post(this.translationApi, "{\"languageCode\":\"nb\",\"group\":\"test\",\"label\":\"test_test2\",\"value\":\"Dette er en test nr 2\"}").pipe(
      tap(t => {
        console.log('t', t);
        return t
      }),
      // catchError(
      //   this.handleError('addLanguageKey', languageItem)
      // ),
      catchError(error => {

        console.log('translationservice error', error);

        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        }
        else {
          //this.errorMessage = this.apiService.getServerErrorMessage(error);
        }

        return throwError(this.errorMessage);
      })
    );

  }

  handleError(arg0: string, arg1: LanguageItem): any {
    // console.log('arg0', arg0);
    // console.log('arg1', arg1);
    console.log('Something went wrong');

  }

}
