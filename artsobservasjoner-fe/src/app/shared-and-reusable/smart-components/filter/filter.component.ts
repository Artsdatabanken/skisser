import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  form: FormGroup;
  searchText: string = '';

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {

    this.form = this.fb.group({
      year: new FormControl(''),
      speciesGroup: new FormControl(''),
      taxon: new FormControl(''),
      area: new FormControl('')
    });

  }
  
}
