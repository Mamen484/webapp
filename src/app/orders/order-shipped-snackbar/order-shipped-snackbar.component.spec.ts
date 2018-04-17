import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShippedSnackbarComponent } from './order-shipped-snackbar.component';

describe('OrderShippedSnackbarComponent', () => {
  let component: OrderShippedSnackbarComponent;
  let fixture: ComponentFixture<OrderShippedSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderShippedSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderShippedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
