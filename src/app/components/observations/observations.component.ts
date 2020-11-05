import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})

export class ObservationsComponent implements OnInit {

  submenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.submenu = this.navigationService.getSubMenu('observations');
  }

}
