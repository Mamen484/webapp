import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFilteringAreaComponent } from './timeline-filtering-area.component';

describe('TimelineFilteringAreaComponent', () => {
  let component: TimelineFilteringAreaComponent;
  let fixture: ComponentFixture<TimelineFilteringAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFilteringAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFilteringAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
