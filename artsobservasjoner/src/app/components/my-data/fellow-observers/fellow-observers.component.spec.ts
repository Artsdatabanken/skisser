import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FellowObserversComponent } from './fellow-observers.component';

describe('FellowObserversComponent', () => {
  let component: FellowObserversComponent;
  let fixture: ComponentFixture<FellowObserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FellowObserversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FellowObserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
