import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  submenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.submenu = this.navigationService.getSubMenu('about');
  }

}
