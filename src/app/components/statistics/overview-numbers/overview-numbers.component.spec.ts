import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewNumbersComponent } from './overview-numbers.component';

describe('OverviewNumbersComponent', () => {
  let component: OverviewNumbersComponent;
  let fixture: ComponentFixture<OverviewNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
