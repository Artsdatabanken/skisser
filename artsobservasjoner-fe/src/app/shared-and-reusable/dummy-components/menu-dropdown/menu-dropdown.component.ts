import { Component, Input, OnInit } from '@angular/core';
import { DropdownOption } from 'src/app/models/reusable';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})

export class MenuDropdownComponent implements OnInit {

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
