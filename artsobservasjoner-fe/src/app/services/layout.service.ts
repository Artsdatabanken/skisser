import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {

  showDropdownPane: boolean;
  dropdownVisibility: Subject<boolean> = new Subject<boolean>();
  dropdownLinkText: Subject<string> = new Subject<string>();
  defaultDropdownText: string;

  constructor() {
    this.showDropdownPane = false;
    this.defaultDropdownText = 'Volumstatistikk';
  }

  toggleDropdown(): void {
    this.showDropdownPane = !this.showDropdownPane;
    this.dropdownVisibility.next(this.showDropdownPane);
  }

  closeDropdown(): void {
    this.showDropdownPane = false; // change state
    this.dropdownVisibility.next(this.showDropdownPane); // propagate the new state
  }

  propagateDropdownLinkText(dropdownLinkText: string): void {
    this.dropdownLinkText.next(dropdownLinkText); // propagate the new state
  }
}
