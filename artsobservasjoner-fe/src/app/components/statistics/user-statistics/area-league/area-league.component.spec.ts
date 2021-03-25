import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLeagueComponent } from './area-league.component';

describe('AreaLeagueComponent', () => {
  let component: AreaLeagueComponent;
  let fixture: ComponentFixture<AreaLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
