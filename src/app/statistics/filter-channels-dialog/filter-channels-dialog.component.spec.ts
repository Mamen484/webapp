import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChannelsDialogComponent } from './filter-channels-dialog.component';
import { MD_DIALOG_DATA, MdDialog, MdDialogModule, MdDialogRef, MdSelectModule } from '@angular/material';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleIdService } from '../../core/services/locale-id.service';

describe('FilterChannelsDialogComponent', () => {
    let component: FilterChannelsDialogComponent;
    let fixture: ComponentFixture<FilterChannelsDialogComponent>;
    let params;

    beforeEach(async(() => {
        params = new ChannelsRequestParams();
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                CommonModule,
                FormsModule,
                MdDialogModule,
                MdSelectModule,
            ],
            declarations: [FilterChannelsDialogComponent],
            providers: [
                {provide: MdDialogRef, useValue: {}},
                {provide: MD_DIALOG_DATA, useValue: params},
                {provide: LocaleIdService, useValue: {localeId: 'en'}}
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
});
