import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ActionSequence } from 'protractor';
import { Subscription } from 'rxjs';
import Settings from 'src/app/data/settings.json';
import { AboutPage } from 'src/app/models/aboutPage';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-subnavigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss']
})

export class SubNavigationComponent implements OnInit {

  subscription: Subscription;
  @Input() ariaLabel: string;

  ids: string[] = Settings.drupalIds;
  aboutPages: AboutPage[] = [];

  constructor(
    private dataService: DataService   
  ) { }

  ngOnInit(): void {
    this.getAboutPages();
  } 

  getAboutPages(): void {

    this.ids.forEach(id => {

      this.subscription = this.dataService.getAboutPagesById(+id).subscribe(res => {

        let aboutPage: AboutPage;

        res.forEach(r => {

          aboutPage = {
            id: r.id,
            url: r.url,
            heading: r.heading,
            intro: r.intro,
            body: r.body,
            content: r.content,
            title: r.title,
            languages: null,
            order: r.order
          };

          this.aboutPages.push(aboutPage);

        });

        this.aboutPages = this.aboutPages.sort((a: AboutPage, b: AboutPage) => a.order - b.order);

      });

    });

  }

  ngOndestroy(): void {
    this.subscription.unsubscribe();
  }
}
