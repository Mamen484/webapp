import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBlockDialogComponent } from './store-block-dialog.component';

describe('StoreBlockDialogComponent', () => {
  let component: StoreBlockDialogComponent;
  let fixture: ComponentFixture<StoreBlockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBlockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBlockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
