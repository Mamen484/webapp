import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChannelsComponent } from './search-channels.component';
import {
    MatButtonModule, MatCardModule, MatChipsModule, MatDialog, MatIconModule,
    MatProgressBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';

describe('SearchChannelsComponent', () => {
    let component: SearchChannelsComponent;
    let fixture: ComponentFixture<SearchChannelsComponent>;
    let afterClosedSpy: jasmine.Spy;

    beforeEach(async(() => {
        afterClosedSpy = jasmine.createSpy('afterClosedSpy')
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatChipsModule,
                MatButtonModule,
                MatIconModule,
                MatProgressBarModule
            ],
            declarations: [
                SearchChannelsComponent,
            ],
            providers: [
                {provide: MatDialog, useValue: {open: () => ({afterClosed: afterClosedSpy})}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchChannelsComponent);
        component = fixture.componentInstance;
        component.filter = new ChannelsRequestParams();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should emit the value when the control changes', done => {
        component.applyFilter.subscribe(value => {
            expect(value instanceof ChannelsRequestParams).toEqual(true);
            expect(value.searchQuery).toEqual('something');
            done();
        });
        component.searchControl.setValue('something');
    });

    it('should emit the filter params when the dialog window closes', done => {
        component.applyFilter.subscribe(value => {
            expect(value instanceof ChannelsRequestParams).toEqual(true);
            expect(value.searchQuery).toEqual('');
            expect(value.type).toEqual('retargeting');
            expect(value.country).toEqual('en');
            expect(value.segment).toEqual('fashion');
            done();
        });

        let filter = new ChannelsRequestParams();
        filter.type = 'retargeting';
        filter.country = 'en';
        filter.segment = 'fashion';
        afterClosedSpy.and.returnValue(Observable.of(filter));
        component.openDialog();

    });

    it('should not reset the searchQuery when get filtering data from the dialog', done => {
        component.applyFilter.subscribe(value => {
            expect(value instanceof ChannelsRequestParams).toEqual(true);
            expect(value.searchQuery).toEqual('babadag');
            expect(value.type).toEqual('retargeting');
            expect(value.country).toEqual('en');
            expect(value.segment).toEqual('fashion');
            done();
        });
        component.filter.searchQuery = 'babadag'
        let filter = new ChannelsRequestParams();
        filter.type = 'retargeting';
        filter.country = 'en';
        filter.segment = 'fashion';
        afterClosedSpy.and.returnValue(Observable.of(filter));
        component.openDialog();
    });

    it('should emit an updated filter when some options is canceled', done => {
        component.applyFilter.subscribe(value => {
            expect(value instanceof ChannelsRequestParams).toEqual(true);
            expect(value.searchQuery).toEqual('babadag');
            expect(value.type).toEqual('');
            expect(value.country).toEqual('en');
            expect(value.segment).toEqual('fashion');
            done();
        });

        component.filter.searchQuery = 'babadag';
        component.filter.type = 'retargeting';
        component.filter.country = 'en';
        component.filter.segment = 'fashion';
        component.cancelFilter('type');
    });

    it('should not emit the filter with one character (at least two characters)', done => {
        component.applyFilter.subscribe(value => {
            expect(value instanceof ChannelsRequestParams).toEqual(true);
            // ignores 'a', receives only 'ab'
            expect(value.searchQuery).toEqual('ab');
            done();
        });

        component.searchControl.setValue('a');
        component.searchControl.setValue('ab');
    });

    it('should reset the searchQuery filter when the user deletes all the characters from the search input', done => {

        let expectedValue = 'ab';
        component.searchControl.setValue('ab');
        component.applyFilter.subscribe((value: ChannelsRequestParams) => {
            expect(value.searchQuery).toEqual(expectedValue);

            if (expectedValue === '') {
                done();
                return;
            }
            setTimeout(() => {
                expectedValue = '';
                component.searchControl.setValue('');
            }, 0);
        });
    })
});
