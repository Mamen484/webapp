import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesListComponent } from './attributes-list.component';
import { Autotag } from '../../../autotag';

describe('AttributesListComponent', () => {
  let component: AttributesListComponent;
  let fixture: ComponentFixture<AttributesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display both an autotag input and autotag dropdown if autotag has mixed attribute ids', () => {
    component.autotagList = <Autotag[]>[
      {_embedded: {attribute: {constraintGroupId: null}}},
      {_embedded: {attribute: {constraintGroupId: 1}}},
      {_embedded: {attribute: {constraintGroupId: null}}},
      {_embedded: {attribute: {constraintGroupId: 2}}},
      {_embedded: {attribute: {constraintGroupId: 3}}},
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(2);
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(3);
  });

  it('should display an autotag input if attribute group id is NOT constrained', () => {
    component.autotagList = <Autotag[]>[{
      _embedded: {attribute: {constraintGroupId: null}}
    }];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(1);
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(0);
  });

  it('should display an autotag dropdown if attribute group id is constrained', () => {
    component.autotagList = <Autotag[]>[{
      _embedded: {attribute: {constraintGroupId: 1}}
    }];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(0);
    expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(1);
  });
});
