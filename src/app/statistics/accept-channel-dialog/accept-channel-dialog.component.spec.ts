import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptChannelDialogComponent } from './accept-channel-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { StoreService } from '../../core/services/store.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

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

    it('should display correct texts', () => {
        storeService.getStoreCharge.and.returnValue(of({charge: {amount: 22, currency: 'EUR'}, references: {count: 10}}));
        fixture.detectChanges();
        expect(element('.top-text').textContent.trim()).toEqual('List your 10 SKU\'s on');
        expect(element('.price').textContent.trim()).toEqual('Only 22,00 €/Month');
        expect(element('.premium-channels').textContent.trim()).toEqual('3 premium channelsincluded in each of our plans');
        expect(element('.free-trial').textContent.trim()).toEqual('30 days free trialwith onboarding and setup assistance');
        expect(element('.monthly-fee').textContent.trim()).toEqual('flat monthly feeno contracts, sales limits, or commissions');
    });

    function element(selector) {
        return fixture.debugElement.nativeElement.querySelector(selector);
    }
});
