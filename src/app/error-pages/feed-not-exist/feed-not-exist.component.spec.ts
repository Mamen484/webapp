import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedNotExistComponent } from './feed-not-exist.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedNotExistComponent', () => {
  let component: FeedNotExistComponent;
  let fixture: ComponentFixture<FeedNotExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedNotExistComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedNotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
