import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  isLoggedIn: boolean; 
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isLoggedIn = false;
    console.log('login status', this.isLoggedIn)
  }

  login(): void {
    this.isLoggedIn = true;
    this.loginStatus.next(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false; // change state
    this.loginStatus.next(this.isLoggedIn); // propagate the new state
  }

}
