import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Renderer2 } from '@angular/core';
import { TopNavigationComponent } from '../layout/top-navigation/top-navigation.component';


@Directive({
    selector: '[closePane]'
}) // TODO: CREATE A MORE GENERIC DIRECTIVE FOR REUSE

export class ClosePaneDirective {

    @HostListener('click') onClick() {
        this.renderer.removeClass(this.document.getElementById('dashboardToggleButton'), 'dashboard-toggle--active');
        this.renderer.removeClass(this.document.getElementById('dashboardPane'), 'dashboard-pane--open');
        // this.host.showDashboardPane = false;
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        public host: TopNavigationComponent
    ) { }

}