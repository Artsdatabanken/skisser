import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})

export class SitemapComponent implements OnInit {

  menuItems: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.menuItems = this.navigationService.getSitemap();

    
  }

}
