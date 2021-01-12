import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionPanelComponent } from '../accordion-panel/accordion-panel.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})

export class AccordionComponent implements AfterContentInit {

  @ContentChildren(AccordionPanelComponent) panels: QueryList<AccordionPanelComponent>;
  subscription: Subscription;

  ngAfterContentInit(): void {

    // Open the first panel
    this.panels.toArray()[0].opened = true;

    // Loop through all panels
    this.panels.toArray().forEach((panel: any) => {
      
      // subscribe panel toggle event
      this.subscription = panel.toggle.subscribe(() => {
        // Open the panel
        this.openPanel(panel);
      });

    });
  }

  openPanel(panel: AccordionPanelComponent) {

    // close all panels
    this.panels.toArray().forEach(p => p.opened = false);

    // open the selected panel    
    panel.opened = true;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

// (panel: QueryList<AccordionPanelComponent>)