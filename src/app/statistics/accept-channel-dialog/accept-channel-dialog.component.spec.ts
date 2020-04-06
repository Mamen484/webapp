import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptChannelDialogComponent } from './accept-channel-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { StoreService } from 'sfl-shared/services';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { BlankPipe } from '../../orders/order-details/items-table/items-table.component.spec';

describe('AcceptChannelDialogComponent', () => {
    let component: AcceptChannelDialogComponent;
    let fixture: ComponentFixture<AcceptChannelDialogComponent>;
    let storeService: jasmine.SpyObj<StoreService>;
    let store: jasmine.SpyObj<Store<AppState>>;
    beforeEach(async(() => {
        storeService = jasmine.createSpyObj(['getStoreCharge']);
        store = jasmine.createSpyObj(['select']);

        store.select.and.returnValue(of({id: 141}));

        TestBed.configureTestingModule({
            declarations: [AcceptChannelDialogComponent, SfCurrencyPipe],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: StoreService, useValue: storeService},
                {provide: Store, useValue: store},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcceptChannelDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    function element(selector) {
        return fixture.debugElement.nativeElement.querySelector(selector);
    }
});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
