import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountPicturesComponent } from './user-count-pictures.component';

describe('UserCountPicturesComponent', () => {
  let component: UserCountPicturesComponent;
  let fixture: ComponentFixture<UserCountPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCountPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
