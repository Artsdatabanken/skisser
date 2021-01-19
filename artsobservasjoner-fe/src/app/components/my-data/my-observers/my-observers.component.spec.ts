import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObserversComponent } from './my-observers.component';

describe('MyObserversComponent', () => {
  let component: MyObserversComponent;
  let fixture: ComponentFixture<MyObserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyObserversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
