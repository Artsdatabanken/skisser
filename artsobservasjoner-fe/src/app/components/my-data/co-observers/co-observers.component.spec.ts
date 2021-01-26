import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoObserversComponent } from './co-observers.component';

describe('CoObserversComponent', () => {
  let component: CoObserversComponent;
  let fixture: ComponentFixture<CoObserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoObserversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoObserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
