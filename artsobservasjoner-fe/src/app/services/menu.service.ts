import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  activeMenu: boolean;
  menuVisibility: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.activeMenu = false;
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
    this.menuVisibility.next(this.activeMenu);
  }

  closeMenu(): void {
    this.activeMenu = false;
    this.menuVisibility.next(this.activeMenu);
  }

}
