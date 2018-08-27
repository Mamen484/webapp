import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemsDialogComponent } from './select-items-dialog.component';

describe('SelectItemsDialogComponent', () => {
  let component: SelectItemsDialogComponent;
  let fixture: ComponentFixture<SelectItemsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectItemsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
