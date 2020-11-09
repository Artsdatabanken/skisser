import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObservationsComponent } from './my-observations.component';

describe('MyObservationsComponent', () => {
  let component: MyObservationsComponent;
  let fixture: ComponentFixture<MyObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyObservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
