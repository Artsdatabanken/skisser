import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import UserSettings from '../config/fakeUsers.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  settings: any = UserSettings;

  constructor() { }

  getFakeUsers(): Observable<string[]> {

    const users: string[] = this.settings;

    return of(users).pipe();

  }

}

