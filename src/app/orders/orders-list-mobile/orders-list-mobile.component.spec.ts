import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListMobileComponent } from './orders-list-mobile.component';

describe('OrdersListMobileComponent', () => {
  let component: OrdersListMobileComponent;
  let fixture: ComponentFixture<OrdersListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
