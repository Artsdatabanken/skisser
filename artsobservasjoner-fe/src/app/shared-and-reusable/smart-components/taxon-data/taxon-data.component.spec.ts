import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonDataComponent } from './taxon-data.component';

describe('TaxonDataComponent', () => {
  let component: TaxonDataComponent;
  let fixture: ComponentFixture<TaxonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
