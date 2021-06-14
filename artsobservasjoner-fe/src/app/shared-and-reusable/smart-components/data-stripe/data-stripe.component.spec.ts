import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStripeComponent } from './data-stripe.component';

describe('DataStripeComponent', () => {
  let component: DataStripeComponent;
  let fixture: ComponentFixture<DataStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStripeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
