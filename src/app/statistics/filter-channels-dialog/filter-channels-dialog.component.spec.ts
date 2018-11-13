import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SflLocaleIdService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { FilterChannelsDialogComponent } from './filter-channels-dialog.component';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FilterChannelsDialogComponent', () => {
    let component: FilterChannelsDialogComponent;
    let fixture: ComponentFixture<FilterChannelsDialogComponent>;
    let params;
    let matDialog: MatDialogRef<any>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj('MatDialog', ['close']);
        params = new ChannelsRequestParams();
        TestBed.configureTestingModule({
            imports: [],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [FilterChannelsDialogComponent],
            providers: [
                {provide: MatDialogRef, useValue: matDialog},
                {provide: MAT_DIALOG_DATA, useValue: params},
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: Store, useValue: {select: () => of({country: 'en'})}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterChannelsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should create own copy of the filter not to modify original one', () => {
        expect(component.filter !== params).toEqual(true);
    });

    it('should write a country from a store', () => {
        expect(component.filter.country).toEqual('en');
    });

    it('cancel should call cancel on MdDialog without params', () => {
        component.cancel();
        expect(matDialog.close).toHaveBeenCalledWith();
    });

    it('cancel should call accept on MdDialog passing a filter as a param', () => {
        component.accept();
        expect(matDialog.close).toHaveBeenCalledWith(component.filter);
    });
});
