import { Directive, HostListener } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';


@Directive({
    selector: '[closePane]'
}) // TODO: CREATE A MORE GENERIC DIRECTIVE FOR REUSE

export class ClosePaneDirective {

    @HostListener('click') onClick() {
        this.utilitiesService.closeDashboard();
    }

    constructor(private utilitiesService: UtilitiesService) { }

}