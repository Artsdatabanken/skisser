import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Announcement } from 'src/app/models/news';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})

export class AnnouncementComponent implements OnInit {

  pageTitle: string;
  announcementId: number;
  announcement: Announcement;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.announcementId = this.route.snapshot.params["id"];

    console.log('ann id', this.announcementId)
  }

  ngOnInit(): void {

    this.subscription = this.dataService.getNewsItemById(this.announcementId).subscribe(ni => {
      this.announcement = ni;
      this.pageTitle = ni.title;
      this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
