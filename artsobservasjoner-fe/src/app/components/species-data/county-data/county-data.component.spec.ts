import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyDataComponent } from './county-data.component';

describe('CountyDataComponent', () => {
  let component: CountyDataComponent;
  let fixture: ComponentFixture<CountyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
