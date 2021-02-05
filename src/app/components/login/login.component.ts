import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.isLoggedIn = this.loginService.isLoggedIn;
    this.subscription = this.loginService.loginStatus.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login();
    this.router.navigateByUrl('/dashboard');
  }

  logout(): void {
    this.loginService.logout();
  }

}
