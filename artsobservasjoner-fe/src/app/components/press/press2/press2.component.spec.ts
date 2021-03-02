import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Press2Component } from './press2.component';

describe('Press2Component', () => {
  let component: Press2Component;
  let fixture: ComponentFixture<Press2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Press2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Press2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
