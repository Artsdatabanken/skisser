import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataSpeciesComponent } from './no-data-species.component';

describe('NoDataSpeciesComponent', () => {
  let component: NoDataSpeciesComponent;
  let fixture: ComponentFixture<NoDataSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
