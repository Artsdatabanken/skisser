import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingIdComponent } from './sighting-id.component';

describe('SightingIdComponent', () => {
  let component: SightingIdComponent;
  let fixture: ComponentFixture<SightingIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightingIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
