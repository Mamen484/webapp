import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

describe('OrdersListComponent', () => {
    let component: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;
    let media: jasmine.SpyObj<MediaObserver>;

    beforeEach(async(() => {
        media = <any>{media$: jasmine.createSpyObj(['subscribe']), isActive: jasmine.createSpy('media.isActive spy')};
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MediaObserver, useValue: media}
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
