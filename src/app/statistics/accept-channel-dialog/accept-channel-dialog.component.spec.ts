import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptChannelDialogComponent } from './accept-channel-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';

describe('AcceptChannelDialogComponent', () => {
    let component: AcceptChannelDialogComponent;
    let fixture: ComponentFixture<AcceptChannelDialogComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AcceptChannelDialogComponent, SfCurrencyPipe],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {charge: {charge: {amount: 22, currency: 'EUR'}, references: {count: 10}}}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcceptChannelDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })
});
