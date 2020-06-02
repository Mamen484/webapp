import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesUpdateErrorSnackbarComponent } from './attributes-update-error-snackbar.component';

describe('AttributesUpdateErrorSnackbarComponent', () => {
  let component: AttributesUpdateErrorSnackbarComponent;
  let fixture: ComponentFixture<AttributesUpdateErrorSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesUpdateErrorSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesUpdateErrorSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
