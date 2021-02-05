import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienSpeciesComponent } from './alien-species.component';

describe('AlienSpeciesComponent', () => {
  let component: AlienSpeciesComponent;
  let fixture: ComponentFixture<AlienSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlienSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
