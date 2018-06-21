import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorsSnackbarComponent } from './validation-errors-snackbar.component';

describe('ValidationErrorsSnackbarComponent', () => {
  let component: ValidationErrorsSnackbarComponent;
  let fixture: ComponentFixture<ValidationErrorsSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorsSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorsSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
