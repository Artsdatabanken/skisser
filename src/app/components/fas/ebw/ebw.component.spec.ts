import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbwComponent } from './ebw.component';

describe('EbwComponent', () => {
  let component: EbwComponent;
  let fixture: ComponentFixture<EbwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
