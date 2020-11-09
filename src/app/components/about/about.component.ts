import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  subMenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('about');
  }

}
