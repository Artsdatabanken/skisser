import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) { }

  setPageTitle(key: string): Observable<string> {

    return this.translate.stream([key]).pipe(
      map(res => {

        this.titleService.setTitle(`${res[key]} - Artsobservasjoner`);
        return res[key];

      })
    );

  }

}
