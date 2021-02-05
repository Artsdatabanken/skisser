import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})

export class ShortcutsComponent implements OnInit {

  @Input() location: string;

  constructor() { }

  ngOnInit(): void { }

}
