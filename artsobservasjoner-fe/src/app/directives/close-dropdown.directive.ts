import { Directive, HostListener } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Directive({
    selector: '[closeDropdown]'
}) 

export class CloseDropdownDirective {

    @HostListener('click') onClick() {
        this.layoutService.closeDropdown();
    }

    constructor(private layoutService: LayoutService) { }

}