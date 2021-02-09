import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { EMPTY, of } from 'rxjs';
import { TimelineService } from 'sfl-shared/services';
import { Pipe, PipeTransform } from '@angular/core';

describe('DataTableComponent (connected)', () => {
    let component: DataTableComponent;
    let fixture: ComponentFixture<DataTableComponent>;
    let timelineService: jasmine.SpyObj<TimelineService>;

    beforeEach(async () => {
        timelineService = jasmine.createSpyObj(['getEvents']);
        timelineService.getEvents.and.returnValue(EMPTY);
        await TestBed.configureTestingModule({
            declarations: [DataTableComponent, CurrencyPipe, ChannelLink],
            providers: [
                {provide: TimelineService, useValue: timelineService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        timelineService.getEvents.and.returnValue(EMPTY);
        fixture = TestBed.createComponent(DataTableComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign exports on init', () => {
        component.channels = <any>[{id: 1, _embedded: {channel: {}}}];
        component.statistics = {};
        timelineService.getEvents.and.returnValue(of(<any>{
            _embedded: {
                timeline: [
                    {_embedded: {channel: {id: 1, occurredAt: 1}}},
                    {_embedded: {channel: {id: 2, occurredAt: 2}}},
                    {_embedded: {channel: {id: 1, occurredAt: 3}}},
                ]
            }
        }))
        fixture.detectChanges();
        expect(component.exports).toEqual(<any>{
            1: {_embedded: {channel: {id: 1, occurredAt: 1}}},
            2: {_embedded: {channel: {id: 2, occurredAt: 2}}},
        });
    });
});

@Pipe({
    name: 'sfCurrency',
})
class CurrencyPipe implements PipeTransform {
    transform() {
    }
}

@Pipe({
    name: 'sfChannelLink',
})
class ChannelLink implements PipeTransform {
    transform() {
    }
}

