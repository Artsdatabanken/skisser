import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifiedMenuComponent } from './simplified-menu.component';

describe('SimplifiedMenuComponent', () => {
  let component: SimplifiedMenuComponent;
  let fixture: ComponentFixture<SimplifiedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifiedMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifiedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
