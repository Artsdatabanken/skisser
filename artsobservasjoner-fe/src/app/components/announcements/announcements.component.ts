import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/models/press';
import { PressService } from 'src/app/services/press.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})

export class AnnouncementsComponent implements OnInit {

  errorMessage: string;
  announcements$: Observable<Announcement[]>;
  
  @Input() take: number;
  @Input() location: string;

  constructor(private pressService: PressService) { }

  ngOnInit(): void {
    
    this.announcements$ = this.pressService.getAnnouncements();

  }

}
