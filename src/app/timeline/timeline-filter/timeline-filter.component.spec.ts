import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFilterComponent } from './timeline-filter.component';

describe('TimelineFilterComponent', () => {
  let component: TimelineFilterComponent;
  let fixture: ComponentFixture<TimelineFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
