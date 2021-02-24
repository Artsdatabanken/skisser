import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})

export class CustomDropdownComponent implements OnInit {


  newOption: any;
  emptyDataSelection = { name: 'Select' };
  _currentSelection: any;

  @Input() options: any;
  @Output() currentSelectionChange = new EventEmitter<object>();

  get currentSelection() {
    return this._currentSelection;
  }

  @Input()
  set currentSelection(value) {
    this._currentSelection = value === '' || value === null || value === undefined ? this.emptyDataSelection : value;
  }

  constructor() {
    this.newOption = '';
  }

  ngOnInit() {
    console.log('options', this.options)
  }

  setCurrentSelection(option) {
    this.currentSelection = option;
    this.currentSelectionChange.emit(option);
  }

}
