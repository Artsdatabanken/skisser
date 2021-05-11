import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountSightingsComponent } from './user-count-sightings.component';

describe('UserCountSightingsComponent', () => {
  let component: UserCountSightingsComponent;
  let fixture: ComponentFixture<UserCountSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCountSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
