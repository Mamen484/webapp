import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

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
                {provide: MediaObserver, useValue: media},
                {provide: ActivatedRoute, useValue: {queryParams: new Subject()}},
                {provide: Store, useValue: appStore},
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
