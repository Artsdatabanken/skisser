import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-overview-statistics',
  templateUrl: './overview-statistics.component.html',
  styleUrls: ['./overview-statistics.component.scss']
})

export class OverviewStatisticsComponent implements OnInit {

  pageTitle: string;
  children: any[] = [];

  @Input() open: boolean;
  activeDropdown: boolean;
  subscription: Subscription;

  dropDownText: string = "statistikk";

  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService
  ) {

    this.pageTitle = this.route.routeConfig.data.text;
    this.children = this.route.routeConfig.children.filter(ch => ch.data.hidden === false);
    //this.dropDownText = this.layoutService.defaultDropdownText;

    this.subscription = this.layoutService.dropdownVisibility.subscribe((value) => {
      this.activeDropdown = value;
    });

    // TODO: push subscription into array instead of reassign subscription which is incorrect

    this.subscription = this.layoutService.dropdownLinkText.subscribe((value) => {
      //this.dropDownText = value;
    });

  }

  ngOnInit(): void {
    //this.activeDropdown = true;
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.layoutService.toggleDropdown();
  }

  closeDropdown(): void {
    this.layoutService.closeDropdown();
  }

}
