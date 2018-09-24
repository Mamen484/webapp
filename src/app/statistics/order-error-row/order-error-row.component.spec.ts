import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderErrorRowComponent } from './order-error-row.component';

describe('OrderErrorRowComponent', () => {
    let component: OrderErrorRowComponent;
    let fixture: ComponentFixture<OrderErrorRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderErrorRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderErrorRowComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a valid content', () => {
        component.channelName = 'eBay';
        component.reference = 'some_reference';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('eBay some_reference');
    })
});
