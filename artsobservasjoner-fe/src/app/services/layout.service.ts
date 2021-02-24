import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {

  showDropdownPane: boolean;
  dropdownVisibility: Subject<boolean> = new Subject<boolean>();

  // defaultDropdownText: string;
  // dropdownLinkText: Subject<string> = new Subject<string>();

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.showDropdownPane = false;
    // this.defaultDropdownText = 'Volumstatistikk';
  }

  toggleDropdown(): void {
    this.showDropdownPane = !this.showDropdownPane;
    this.dropdownVisibility.next(this.showDropdownPane);
  }

  toggleDropdown2(id: string): void {
    this.showDropdownPane = !this.showDropdownPane;
    this.dropdownVisibility.next(this.showDropdownPane);
  }

  closeDropdown(): void {
    this.showDropdownPane = false; // change state
    this.dropdownVisibility.next(this.showDropdownPane); // propagate the new state
  }

  // propagateDropdownLinkText(dropdownLinkText: string): void {
  //   this.dropdownLinkText.next(dropdownLinkText); // propagate the new state
  // }

  //----------------------------------------------------------------------------------------------------***

  setPageTitle(key: string): Observable<string> {

    return this.translate.stream([key]).pipe(
      map(res => {

        this.titleService.setTitle(`${res[key]} - Artsobservasjoner`);  
        return res[key];
      
      })
    );

  }

}
