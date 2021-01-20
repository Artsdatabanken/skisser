import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  loremIpsum: string = 'Etiam eleifend felis sed tristique suscipit. Nullam accumsan laoreet velit, sagittis in at nullam molestie placerat ex';
  
  // siteLanguage: string;
  // siteLocale: string;
  // languageList = [
  //   { code: 'no', label: 'Norsk' },
  //   { code: 'en', label: 'English' },
  //   { code: 'es', label: 'Español' },
  // ]

  constructor() { }

  ngOnInit(): void {
    
    // this.siteLocale = window.location.pathname.split('/')[1];

    // this.siteLanguage = this.languageList.find(
    //   (f) => {
    //     f.code === this.siteLocale;
    //   }
    // )?.label;

    // if (!this.siteLanguage) {
    //   //this.onChange(this.languageList[0].code)
    // }


    
    
  }

  onChange(selectedLangCode: string) {
    window.location.href = `/${selectedLangCode}`
  }

}
