import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingFieldsComponent } from './mapping-fields.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MappingFieldsComponent', () => {
  let component: MappingFieldsComponent;
  let fixture: ComponentFixture<MappingFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingFieldsComponent ],
        schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingFieldsComponent);
    component = fixture.componentInstance;
    component.formGroup = {controls: {images: {controls: []}}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
