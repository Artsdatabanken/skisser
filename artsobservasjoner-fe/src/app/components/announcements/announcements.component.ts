import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})

export class AnnouncementsComponent implements OnInit {

  errorMessage: string;
  announcements$: Observable<Announcement[]>;
  
  @Input() take: number | null = 0;
  @Input() location: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
    this.announcements$ = this.dataService.getAnnouncements();

  }

}
