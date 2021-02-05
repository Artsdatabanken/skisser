import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  loremIpsum: string = 'Etiam eleifend felis sed tristique suscipit. Nullam accumsan laoreet velit, sagittis in at nullam molestie placerat ex';

  constructor() { }

  ngOnInit(): void { }

}
