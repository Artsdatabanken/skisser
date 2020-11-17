import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Directive({ selector: '[clickElsewhere]' })
export class ClickElsewhereDirective {

  @Output() clickElsewhere = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {

    const targetElement = event.target as HTMLElement;

    console.log('targetElement', targetElement)

    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.clickElsewhere.emit(event);
    }
  }
}

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})

export class TopNavigationComponent implements OnInit {

  topMenu: any[];
  showDashboardPane: boolean;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  @Input() ariaLabel: string;
  @Input() location: string;

  constructor(
    private navigationService: NavigationService,
    private utilitiesService: UtilitiesService
  ) {
    // this.showDashboardPane = utilitiesService.showDashboardPane;
    // this.subscription = utilitiesService.dashboardVisibility.subscribe((value) => { 
    //   this.showDashboardPane = value; 
    // });

  }

  ngOnInit(): void {
    this.topMenu = this.navigationService.getTopMenu();

    this.showDashboardPane = this.utilitiesService.showDashboardPane;
    this.subscription = this.utilitiesService.dashboardVisibility.subscribe((value) => { 
      this.showDashboardPane = value; 
    });
  }

  ngOnDestroy() {
     this.subscription.unsubscribe();
   }

  getStyle(id: string): string {
    return `top-navigation__link--${id}`;
  }

  toggleDashboard(): void {
    this.utilitiesService.toggleDashboard();
    console.log('showDashboardPane', this.showDashboardPane)
  }

  // fake login

  login(): boolean {
    return this.isLoggedIn = true
  }

  logout(): boolean { 
    this.utilitiesService.closeDashboard();
    return this.isLoggedIn = false;
  }

  closeDashboard(): void {
    console.log('cerrado')
    // this.showDashboardPane = false;
  }

}
