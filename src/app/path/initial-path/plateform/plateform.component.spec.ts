/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlateformComponent } from './plateform.component';

describe('PlateformComponent', () => {
  let component: PlateformComponent;
  let fixture: ComponentFixture<PlateformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
