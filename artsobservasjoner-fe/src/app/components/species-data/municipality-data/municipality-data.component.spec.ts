import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityDataComponent } from './municipality-data.component';

describe('MunicipalityDataComponent', () => {
  let component: MunicipalityDataComponent;
  let fixture: ComponentFixture<MunicipalityDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
