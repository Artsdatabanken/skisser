import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopObserversComponent } from './top-observers.component';

describe('TopObserversComponent', () => {
  let component: TopObserversComponent;
  let fixture: ComponentFixture<TopObserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopObserversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopObserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
