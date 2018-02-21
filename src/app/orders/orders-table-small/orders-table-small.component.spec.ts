import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableSmallComponent } from './orders-table-small.component';

describe('OrdersTableSmallComponent', () => {
  let component: OrdersTableSmallComponent;
  let fixture: ComponentFixture<OrdersTableSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTableSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTableSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
