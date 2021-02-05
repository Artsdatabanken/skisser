import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsObsComponent } from './artsobs.component';

describe('ArtsObsComponent', () => {
  let component: ArtsObsComponent;
  let fixture: ComponentFixture<ArtsObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtsObsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
