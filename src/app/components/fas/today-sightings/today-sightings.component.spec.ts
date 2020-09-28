import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySightingsComponent } from './today-sightings.component';

describe('TodaySightingsComponent', () => {
  let component: TodaySightingsComponent;
  let fixture: ComponentFixture<TodaySightingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaySightingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaySightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
