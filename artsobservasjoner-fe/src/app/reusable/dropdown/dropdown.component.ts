import { Component, Input, OnInit } from '@angular/core';
import { chownSync } from 'fs';
import { Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

  @Input() title: string;
  @Input() options: DropdownOption[];
  @Input() icon?: string; // name of the CSS modifier-class
  @Input() type: string;
  @Input() open?: boolean;

  activeDropdown: boolean;
  subscriptions: Subscription[] = [];

  constructor(private layoutService: LayoutService) {
    this.subscriptions.push(
      this.layoutService.dropdownVisibility.subscribe((value) => {
        this.activeDropdown = value;
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleDropdown(): void {
    this.layoutService.toggleDropdown();
  }

  closeDropdown(): void {
    this.layoutService.closeDropdown();
  }

  getDropdownOptionIcon(optionIcon?: string, icon?: string): string {

    let iconClass: string;

    optionIcon ? iconClass = optionIcon : iconClass = icon;

    return `dropdown__link--${iconClass}`;

  }

}
