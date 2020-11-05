import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

  submenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.submenu = this.navigationService.getSubMenu('report');
  }

}
