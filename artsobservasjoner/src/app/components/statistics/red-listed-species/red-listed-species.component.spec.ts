import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedListedSpeciesComponent } from './red-listed-species.component';

describe('RedListedSpeciesComponent', () => {
  let component: RedListedSpeciesComponent;
  let fixture: ComponentFixture<RedListedSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedListedSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedListedSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
