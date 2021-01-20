import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QualityAssuredDataComponent } from './quality-assured-data.component';

describe('QualityAssuredDataComponent', () => {
  let component: QualityAssuredDataComponent;
  let fixture: ComponentFixture<QualityAssuredDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAssuredDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAssuredDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
