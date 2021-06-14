import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionStripeComponent } from './accordion-stripe.component';

describe('AccordionStripeComponent', () => {
  let component: AccordionStripeComponent;
  let fixture: ComponentFixture<AccordionStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionStripeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
