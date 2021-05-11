import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonSearchComponent } from './taxon-search.component';

describe('TaxonSearchComponent', () => {
  let component: TaxonSearchComponent;
  let fixture: ComponentFixture<TaxonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
