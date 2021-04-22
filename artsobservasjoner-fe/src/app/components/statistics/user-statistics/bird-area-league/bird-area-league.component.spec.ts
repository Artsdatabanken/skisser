import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdAreaLeagueComponent } from './bird-area-league.component';

describe('BirdAreaLeagueComponent', () => {
  let component: BirdAreaLeagueComponent;
  let fixture: ComponentFixture<BirdAreaLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdAreaLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdAreaLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
