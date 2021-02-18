import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class TranslationSet {
  public languange: string
  public values: { [key: string]: string } = {}
}

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  public languages: object[] = [{ code: 'no', name: 'Norsk' }, { code: 'en', name: 'English' }];

  constructor(private translate: TranslateService) { }

  switchLanguage(selectedLanguageCode: string): void {
    localStorage.setItem('LANGUAGE', selectedLanguageCode);
    this.translate.use(selectedLanguageCode); // IMPORTANT 
  }

}
