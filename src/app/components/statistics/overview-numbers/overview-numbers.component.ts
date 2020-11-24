import { Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';


@Directive({
  selector: '[getDropdownItem]'
})

export class GetDropdownItemDirective {

  elem: any;

  @HostListener('click') onClick() {
    console.log('clicked on', this.elem)
  }

  constructor(private elemRef: ElementRef) {
    this.elem = elemRef.nativeElement;
  }

}


@Component({
  selector: 'app-overview-numbers',
  templateUrl: './overview-numbers.component.html',
  styleUrls: ['./overview-numbers.component.scss']
})

export class OverviewNumbersComponent implements OnInit {

  pageTitle: string;
  children: any[] = [];

  activeDropdown: boolean;
  subscription: Subscription;

  chosen: string;

  constructor(
    private route: ActivatedRoute,
    private utilitiesService: UtilitiesService
  ) {

    this.pageTitle = this.route.routeConfig.data.text;
    this.children = this.route.routeConfig.children;
    this.subscription = this.utilitiesService.dropdownVisibility.subscribe((value) => {
      this.activeDropdown = value;
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    this.utilitiesService.toggleDropdown();
  }

}
