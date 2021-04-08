import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySightingsComponent } from './my-sightings.component';

describe('MySightingsComponent', () => {
  let component: MySightingsComponent;
  let fixture: ComponentFixture<MySightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
