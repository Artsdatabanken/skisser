import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})

export class LoginButtonComponent implements OnInit {

  isLoggedIn: boolean = false;
  subscription: Subscription;
  linkText: string;
  url: string;

  constructor(private loginService: LoginService) {

    this.isLoggedIn = this.loginService.isLoggedIn;
    this.subscription = this.loginService.loginStatus.subscribe((value) => {
      this.isLoggedIn = value;
    });

  }

  ngOnInit(): void {

    if (this.isLoggedIn) {
      this.linkText = 'Min side';
      this.url = '/dashboard'
    }
    else {
      this.linkText = 'Logg inn';
      this.url = '/login';
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
