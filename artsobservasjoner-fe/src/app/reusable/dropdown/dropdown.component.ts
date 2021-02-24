import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
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

  @Input() id: string;
  @Input() title: string;
  @Input() options: DropdownOption[];
  @Input() icon?: string; // name of the CSS modifier-class
  @Input() open?: boolean;
  @Output() isActive = new EventEmitter<boolean>();

  activeDropdown: boolean;
  subscriptions: Subscription[] = [];

  constructor(private layoutService: LayoutService) {
    this.subscriptions.push(
      this.layoutService.dropdownVisibility.subscribe((value) => {
        this.activeDropdown = value;

        console.log('dropdown', this.activeDropdown)
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

  toggleDropdown2(elem: any): void {
    console.log('this', elem.id)
    console.log('this', elem.activeDropdown)
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
