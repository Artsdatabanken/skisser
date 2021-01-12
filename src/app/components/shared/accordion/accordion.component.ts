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

    this.panels.toArray()[0].opened = true;  // open the first panel

    this.panels.toArray().forEach((panel: any) => {
      
      this.subscription = panel.toggle.subscribe(() => {
        this.openPanel(panel);  
      });

    });
  }

  openPanel(panel: AccordionPanelComponent): void {

    this.panels.toArray().forEach(p => p.opened = false); // close all panels
    panel.opened = true; // open the selected panel    

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

// (panel: QueryList<AccordionPanelComponent>)