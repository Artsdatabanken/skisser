import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subnavigation',
  templateUrl: './subnavigation.component.html',
  styleUrls: ['./subnavigation.component.scss']
})

export class SubnavigationComponent implements OnInit {

  navigationLinks$: Observable<string[]>;
  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationLinks$ = this.navigationService.getSubMenuItems();
  }
}
