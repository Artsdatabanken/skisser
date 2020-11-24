import { Directive, HostListener } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';


@Directive({
    selector: '[closeDropdown]'
}) 

export class CloseDropdownDirective {

    @HostListener('click') onClick() {
        this.utilitiesService.closeDropdown();
    }

    constructor(private utilitiesService: UtilitiesService) { }

}