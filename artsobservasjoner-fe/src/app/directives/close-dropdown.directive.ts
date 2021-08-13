import { Directive, Host, HostListener } from '@angular/core';
import { MenuDropdownComponent } from '../shared-and-reusable/dummy-components/menu-dropdown/menu-dropdown.component';

@Directive({
  selector: '[closeDropdown]'
})

export class CloseDropdownDirective {

  constructor(@Host() private dropdown: MenuDropdownComponent) { }

  @HostListener('click') onClick() {
    this.dropdown.activeDropdown = false;
  }

}