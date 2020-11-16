import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

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

  //topMenu$: Observable<string[]>;
  topMenu: any[];
  showDashboardPane: boolean = false;
  isLoggedIn: boolean = false;

  @Input() ariaLabel: string;
  @Input() location: string;

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.topMenu = this.navigationService.getTopMenu();
  }

  getStyle(id: string): string {
    return `top-navigation__link--${id}`;
  }

  toggleDashboard(): void {
    this.showDashboardPane = !this.showDashboardPane;

    //console.log('show', this.showDashboardPane)
  }

  // fake login

  login(): boolean {
    this.showDashboardPane = true;
    return this.isLoggedIn = true
  }

  logout(): boolean {
    return this.isLoggedIn = false;
  }

  closeDashboard(): void {
    console.log('cerrado')
    this.showDashboardPane = false;
  }

}
