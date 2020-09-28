import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FasComponent } from './fas.component';

describe('FasComponent', () => {
  let component: FasComponent;
  let fixture: ComponentFixture<FasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
