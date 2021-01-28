import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedDataComponent } from './validated-data.component';

describe('ValidatedDataComponent', () => {
  let component: ValidatedDataComponent;
  let fixture: ComponentFixture<ValidatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
