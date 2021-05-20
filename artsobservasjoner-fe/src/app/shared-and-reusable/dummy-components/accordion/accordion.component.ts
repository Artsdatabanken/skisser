import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})

export class AccordionComponent implements AfterContentInit {

  @ContentChildren(AccordionItemComponent) panels: QueryList<AccordionItemComponent>;
  subscription: Subscription;

  ngAfterContentInit(): void {

    //this.panels.toArray()[0].opened = true;  // open the first panel PS: denne lager bug med AfterViewInit og ChangeDetectionCheck

    this.panels.toArray().forEach((panel: any) => {

      panel.toggle.subscribe(() => {
        this.togglePanel(panel);
      });

    });
  }

  openPanel(panel: AccordionItemComponent): void {
    this.panels.toArray().forEach(p => p.opened = false); // close all panels
    panel.opened = true; // open the selected panel    
  }

  togglePanel(panel: AccordionItemComponent): void {
    panel.opened = !panel.opened;

    if (panel.shouldCloseOtherItems) {
      this.panels.toArray().filter(p => p !== panel).forEach(p => p.opened = false); // close all panels that aren't our panel
    }
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe(); // results in a bug, must fix
  }

}
