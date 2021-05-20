import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})

export class AccordionItemComponent implements OnInit {

  @Input() opened: boolean = false;
  @Input() style?: string;
  @Input() headerId: string;
  @Input() panelId: string;
  @Input() heading: string;
  @Input() shouldCloseOtherItems?: boolean;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

}
