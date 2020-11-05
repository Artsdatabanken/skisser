import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})

export class MyDataComponent implements OnInit {
  
  submenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.submenu = this.navigationService.getSubMenu('my-data');
  }
  
}
