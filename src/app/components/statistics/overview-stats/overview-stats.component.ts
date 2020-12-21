import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-overview-stats',
  templateUrl: './overview-stats.component.html',
  styleUrls: ['./overview-stats.component.scss']
})

export class OverviewStatsComponent implements OnInit {

  pageTitle: string;
  children: any[] = [];

  activeDropdown: boolean;
  subscription: Subscription;

  dropDownText: string;

  constructor(
    private route: ActivatedRoute,
    private utilitiesService: UtilitiesService
  ) {

    this.pageTitle = this.route.routeConfig.data.text;
    this.children = this.route.routeConfig.children.filter(ch => ch.data.hidden === false);
    this.dropDownText = this.utilitiesService.defaultDropdownText;

    this.subscription = this.utilitiesService.dropdownVisibility.subscribe((value) => {
      this.activeDropdown = value;
    });

    this.subscription = this.utilitiesService.dropdownLinkText.subscribe((value) => {
      this.dropDownText = value;
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.utilitiesService.toggleDropdown();
  }

  closeDropdown(): void {
    this.utilitiesService.closeDropdown();
  }

}
