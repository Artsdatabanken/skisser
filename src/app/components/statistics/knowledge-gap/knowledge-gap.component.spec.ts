import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeGapComponent } from './knowledge-gap.component';

describe('KnowledgeGapComponent', () => {
  let component: KnowledgeGapComponent;
  let fixture: ComponentFixture<KnowledgeGapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeGapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
