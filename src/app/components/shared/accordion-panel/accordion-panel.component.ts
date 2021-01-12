import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion-panel.component.scss']
})

export class AccordionPanelComponent implements OnInit {

  @Input() opened: boolean = false;
  @Input() headerId: string;
  @Input() panelId: string;
  @Input() heading: string;
  
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

}
