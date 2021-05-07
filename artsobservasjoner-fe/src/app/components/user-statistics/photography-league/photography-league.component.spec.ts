import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyLeagueComponent } from './photography-league.component';

describe('PhotographyLeagueComponent', () => {
  let component: PhotographyLeagueComponent;
  let fixture: ComponentFixture<PhotographyLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographyLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographyLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
