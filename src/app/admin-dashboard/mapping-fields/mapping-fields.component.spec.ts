import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingFieldsComponent } from './mapping-fields.component';

describe('MappingFieldsComponent', () => {
  let component: MappingFieldsComponent;
  let fixture: ComponentFixture<MappingFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
