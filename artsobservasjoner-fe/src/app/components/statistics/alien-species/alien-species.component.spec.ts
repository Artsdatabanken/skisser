import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlienSpeciesComponent } from './alien-species.component';

describe('AlienSpeciesComponent', () => {
  let component: AlienSpeciesComponent;
  let fixture: ComponentFixture<AlienSpeciesComponent>;

  beforeEach(waitForAsync(() => {
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
