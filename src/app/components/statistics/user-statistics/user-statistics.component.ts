import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})

export class UserStatisticsComponent implements OnInit {

  fakeUsers$: Observable<any[]>;
  toggle: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.fakeUsers$ = this.userService.getFakeUsers();

  }

  getRank(index: number): string {

    const rank: number = index;

    switch (rank) {
      case 0:
        return 'league__item--first';
      case 1:
        return 'league__item--second';
      case 2:
        return 'league__item--third';
      default:
        return '';
    }

  }

  getRank2(index: number): string {

    switch (index) {
      case 0:
        return 'league__icon--first';
      case 1:
        return 'league__icon--second';
      case 2:
        return 'league__icon--third';
      default:
        return '';
    }

  }

  getRank3(index: number): string {

    switch (index) {
      case 0:
        return 'league__counter--first';
      case 1:
        return 'league__counter--second';
      case 2:
        return 'league__counter--third';
      default:
        return '';
    }

  }

  toggleWinners(): void {
    this.toggle = !this.toggle;
  }

}
