import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Translations from '../data/translations.json';

export class TranslationSet {
  public languange: string
  public values: { [key: string]: string } = {}
}

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  translation: any = Translations;
  //public languages: object[] = [{ code: 'no', name: 'Norsk' }, { code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }, { code: 'es', name: 'Español' }];
  public languages: object[] = [{ code: 'no', name: 'Norsk' }, { code: 'en', name: 'English' }];

  public language: string;
  public selectedLanguage: BehaviorSubject<string> = new BehaviorSubject('');

  public otherLanguage: any;
  public unselectedLanguage: BehaviorSubject<object> = new BehaviorSubject(null);

  private dictionary: { [key: string]: TranslationSet } = {
    no: {
      languange: 'no',
      values: {
        example: 'Eksempel',
        account_ogin: 'Logg inn',
        account_register: 'Registrer deg',
        menu_menu: 'Meny',
        menu_parent_report: 'Rapportere observasjoner',
        menu_parent_sightingsData: 'Observasjonsdata',
        menu_parent_userData: 'Min data',
        menu_parent_about: 'Om tjenesten',
        menu_children_report_addObservation: 'Legg til observasjon',
        menu_children_report_checklist: 'Sjekkliste observasjoner',
        menu_children_report_importObservation: 'Importere sightings',
        menu_children_report_eventProject: 'Arrangementer',
        menu_children_report_surveyProject: 'Kartleggingsprosjekter',
        menu_children_sightingsData_sightings: 'Se, søk og filtrer observasjoner',
        menu_children_sightingsData_statistics: 'Tall og statistikk',
        menu_children_userData_mySightings: 'Mine observasjoner',
        menu_children_userData_myStatistics: 'Mine statistikk',
        menu_children_userData_myProjects: 'Mine prosjekter',
        menu_children_userData_myLocations: 'Mine lokaliteter',
        menu_children_userData_myFellowObservers: 'Medobservatører',
        menu_extra_news: 'Aktuelle saker',
        menu_extra_sitemap: 'Nettstedskart',
        sentence: 'Norsk!',
        frontpage_introText1: 'Bli med og hjelp oss å kartlegge norsk natur!',
        frontpage_introText2: 'Lær mer om hvordan du kan bidra',
        frontpage_introText3: 'Lyst til å hjelpe oss å kvalitetssikre artsobservasjoner?',
        frontpage_text_4: 'Flere nyheter og aktuelle saker',
        frontpage_text_5: 'Bli validator',
        frontpage_headings_shortcuts: 'Snarveier',
        frontpage_headings_statistics: 'Statistikk',
        frontpage_headings_news: 'Siste nytt',
      }
    },
    en: {
      languange: 'en',
      values: {
        example: 'Example',
        account_login: 'Log in',
        account_register: 'Register',
        menu_menu: 'Menu',
        menu_parent_report: 'Report / Register',
        menu_parent_sightingsData: 'Sightings data',
        menu_parent_userData: 'My data',
        menu_parent_about: 'About',
        menu_children_report_addObservation: 'Add sighting',
        menu_children_report_checklist: 'Checklist sightings',
        menu_children_report_importObservation: 'Importere sightings',
        menu_children_report_eventProject: 'Events',
        menu_children_report_surveyProject: 'Surveys',
        menu_children_sightingsData_sightings: 'Search and filter sightings',
        menu_children_sightingsData_statistics: 'Statistics',
        menu_children_userData_mySightings: 'My sightings',
        menu_children_userData_myStatistics: 'My statistics',
        menu_children_userData_myProjects: 'My projects',
        menu_children_userData_myLocations: 'My locations',
        menu_children_userData_myFellowObservers: 'My fellow observers',
        menu_extra_news: 'News',
        menu_extra_sitemap: 'Sitemap',
        sentence: 'English!',
        frontpage_introText1: 'Join and help us survey Norwegian nature!',
        frontpage_introText2: 'Learn more about how you can contribute',
        frontpage_introText3: 'Want to help us ensure the quality of our sightings\'s data?',
        frontpage_text_4: 'More news',
        frontpage_text_5: 'Become a validator',
        frontpage_headings_shortcuts: 'Shortcuts',
        frontpage_headings_statistics: 'Statistics',
        frontpage_headings_news: 'News',
      }
    },
    es: {
      languange: 'es',
      values: {
        example: 'Ejemplo',
        account_login: 'Iniciar sesión',
        account_register: 'Regístrate',
        menu_menu: 'Menú',
        menu_parent_report: 'Registrar observaciones',
        menu_parent_sightingsData: 'Data de avistamientos',
        menu_parent_userData: 'Mi data',
        menu_parent_about: 'Sobre',
        menu_children_report_addObservation: 'Agregue avistamiento',
        menu_children_report_checklist: 'Avistamiento en lista',
        menu_children_report_importObservation: 'Importar avistamientos',
        menu_children_report_eventProject: 'Eventos',
        menu_children_report_surveyProject: 'Proyectos',
        menu_children_sightingsData_sightings: 'Buscar y filtrar avistamientos',
        menu_children_sightingsData_statistics: 'Estadísticas',
        menu_children_userData_mySightings: 'Mis avistamientos',
        menu_children_userData_myStatistics: 'Mis estadísticas',
        menu_children_userData_myProjects: 'Mis proyectos',
        menu_children_userData_myLocations: 'Mis localidades',
        menu_children_userData_myFellowObservers: 'Mis compañeros observadores',
        menu_extra_news: 'Noticias',
        menu_extra_sitemap: 'Mapa del sitio',
        sentence: 'Español!',
        frontpage_introText1: '¡Únete y ayúdanos a estudiar la naturaleza noruega!',
        frontpage_introText2: 'Obtenga más información sobre cómo puede contribuir'
      },
    },
  }

  constructor() {
    this.language = 'en';
    this.selectedLanguage.next(this.language);

    this.otherLanguage = this.getOtherLanguage(this.language);
    this.unselectedLanguage.next(this.otherLanguage);

    console.log('site language in translation serv', this.language)
  }

  translate(key: string): string {

    console.log('translate called with value ' + key + ' and language ' + this.language);

    if (this.dictionary[this.language] != null) {
      return this.dictionary[this.language].values[key];
    }
    else {
      return this.dictionary['no'].values[key];
    }

  }

  // if we use select + option  / dropdown
  changeLanguage(languageCode: string): void {
    this.language = languageCode; // change state
    this.selectedLanguage.next(this.language); // propagate the new state
  }

  // if we use a button
  switchLanguage(selectedLanguageCode: string): void {

    this.language = selectedLanguageCode; // change state
    this.selectedLanguage.next(this.language); // propagate the new state
    this.unselectedLanguage.next(this.getOtherLanguage(this.language)); // propagate the non selected language

  }

  getOtherLanguage(selectedLanguage: string): object {

    const extractedLanguage: any = this.languages.find(l => l['code'] !== selectedLanguage);
    return extractedLanguage;

  }

  // -----------------------------------------------------------------------------***

  // getOtherLanguage(selectedLanguage: string): string {

  //   const extractedLanguage: any = this.languages.find(l => l['code'] !== selectedLanguage);

  //   // object deconstructor
  //   const { code } = extractedLanguage;

  //   console.log('other language', extractedLanguage, 'code', code, 'xxx', extractedLanguage.code)

  //   return code;

  // }

  // getTranslation(languageCode: string | null = 'en'): Observable<any[]> {

  //   const translation: any = this.translation.filter(t => {
  //     return t.languageCode === languageCode;
  //   });

  //   this.translation.forEach(element => {
  //     //console.log('translation in service', element)
  //   });

  //   return of(translation).pipe();

  // }

}
