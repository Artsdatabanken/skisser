import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsobsNumbersComponent } from './artsobs-numbers.component';

describe('ArtsobsNumbersComponent', () => {
  let component: ArtsobsNumbersComponent;
  let fixture: ComponentFixture<ArtsobsNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtsobsNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsobsNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
