import { Component, Directive, Host, HostListener, Input, OnInit } from '@angular/core';
import { DropdownOption } from 'src/app/models/reusable';

@Directive({
  selector: '[closeDropdown]'
})

export class CloseDropdownDirective {

  constructor(@Host() private dropdown: DropdownComponent) { }

  @HostListener('click') onClick() {
    this.dropdown.activeDropdown = false;
  }

}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() options: DropdownOption[];
  @Input() icon?: string; // name of the CSS modifier-class
  activeDropdown: boolean;

  constructor() { }

  ngOnInit(): void { }

  // NOTE: dropdown: any: it means the actual dropdown it was clicked on, the actual component
  toggleDropdown(dropdown: any): void {
    dropdown.activeDropdown = !dropdown.activeDropdown;
  }

  closeDropdown(dropdown: any): void {
    dropdown.activeDropdown = false;
  }

  getDropdownOptionIcon(optionIcon?: string, icon?: string): string {

    let iconClass: string;

    optionIcon ? iconClass = optionIcon : iconClass = icon;

    return `dropdown__link--${iconClass}`;

  }

}
