import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {

  @Input() title: string;
  @Input() published: Date;
  @Input() content: string;
  @Input() icon?: string;


  constructor() { }

  ngOnInit(): void {  }

}
