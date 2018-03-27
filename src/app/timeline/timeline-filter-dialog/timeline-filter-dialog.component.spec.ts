import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFilterDialogComponent } from './timeline-filter-dialog.component';

describe('TimelineFilterDialogComponent', () => {
  let component: TimelineFilterDialogComponent;
  let fixture: ComponentFixture<TimelineFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
