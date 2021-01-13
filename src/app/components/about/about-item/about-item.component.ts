import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AboutItem } from 'src/app/models/aboutItem';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss']
})

export class AboutItemComponent implements OnInit {
 
  aboutItemId: number;
  aboutItem: AboutItem;
  pageTitle: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.aboutItemId = this.route.snapshot.params["pageId"];
  }

  ngOnInit(): void {

    // this.dataService.getAboutItemById(this.aboutItemId).subscribe(page => {
    
    //   this.aboutItem = page;
    //   this.pageTitle = page.title;
    //   this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
      
    // });

  }

}
