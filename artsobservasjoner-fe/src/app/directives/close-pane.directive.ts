import { Directive, HostListener } from '@angular/core';
import { MenuService } from '../services/menu.service';


@Directive({
    selector: '[closePane]'
}) // TODO: CREATE A MORE GENERIC DIRECTIVE FOR REUSE

export class ClosePaneDirective {

    @HostListener('click') onClick() {
        //this.menuService.closeDashboard();
    }

    constructor(private menuService: MenuService) { }

}