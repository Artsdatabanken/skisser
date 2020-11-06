import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-extra-navigation',
  templateUrl: './extra-navigation.component.html',
  styleUrls: ['./extra-navigation.component.scss']
})

export class ExtraNavigationComponent implements OnInit {

  extraMenu: any[];

  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.extraMenu = this.navigationService.getExtraMenu();
  }

}
