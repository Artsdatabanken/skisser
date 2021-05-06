import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStatisticsComponent } from './about-statistics.component';

describe('AboutStatisticsComponent', () => {
  let component: AboutStatisticsComponent;
  let fixture: ComponentFixture<AboutStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
