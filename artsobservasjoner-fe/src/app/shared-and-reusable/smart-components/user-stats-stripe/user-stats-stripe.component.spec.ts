import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsStripeComponent } from './user-stats-stripe.component';

describe('UserStatsStripeComponent', () => {
  let component: UserStatsStripeComponent;
  let fixture: ComponentFixture<UserStatsStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatsStripeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatsStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
