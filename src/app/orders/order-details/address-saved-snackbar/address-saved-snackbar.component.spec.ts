import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSavedSnackbarComponent } from './address-saved-snackbar.component';

describe('AddressSavedSnackbarComponent', () => {
  let component: AddressSavedSnackbarComponent;
  let fixture: ComponentFixture<AddressSavedSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressSavedSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSavedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
