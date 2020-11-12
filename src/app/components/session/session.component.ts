import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})

export class SessionComponent implements OnInit {

  roles: string[] = ['admin', 'private', 'special1', 'special2']

  constructor() { }

  ngOnInit(): void { }

}
