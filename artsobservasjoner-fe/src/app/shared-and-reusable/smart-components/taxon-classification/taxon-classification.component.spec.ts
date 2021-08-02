import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonClassificationComponent } from './taxon-classification.component';

describe('TaxonClassificationComponent', () => {
  let component: TaxonClassificationComponent;
  let fixture: ComponentFixture<TaxonClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
