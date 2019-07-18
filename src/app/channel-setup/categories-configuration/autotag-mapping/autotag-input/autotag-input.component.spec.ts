import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagInputComponent } from './autotag-input.component';
import { FeedService } from '../../../../core/services/feed.service';
import { EMPTY, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';

describe('AutotagInputComponent', () => {
    let component: AutotagInputComponent;
    let fixture: ComponentFixture<AutotagInputComponent>;
    let feedService: jasmine.SpyObj<FeedService>;

    beforeEach(async(() => {
        feedService = jasmine.createSpyObj('FeedService spy', ['fetchMappingCollection']);
        TestBed.configureTestingModule({
            declarations: [AutotagInputComponent],
            providers: [{provide: FeedService, useValue: feedService}],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should prepare a correct list of suggestions', () => {
        feedService.fetchMappingCollection.and.returnValue(of({
            count: 5, _embedded: {
                mapping: [
                    {catalogField: 'someString', standardField: ''},
                    {catalogField: 'String1234', standardField: ''},
                    {catalogField: 'table', standardField: ''},
                    {catalogField: 'boat', standardField: ''},
                    {catalogField: '123str', standardField: ''},
                ]
            }
        }));
        component.autotag = <any>{};
        component.ngOnInit();
        component.value = 'str';
        component.createSuggestions();
        expect(component.suggestions).toEqual(['{someString}', '{String1234}', '{123str}', '[str]']);
    });

    it('should remove curly brackets from autotag value on setAutotagValue()', () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        component.autotag = <any>{};
        component.setAutotagValue('{someName}');
        expect(component.autotag.value).toBe('someName');
    });

    it('should save autotag value on setAutotagValue()', () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        component.autotag = <any>{};
        component.setAutotagValue('{someName}');
        expect(component.autotag.value).toBe('someName');
    });

    it('should NOT remove square brackets from autotag value on setAutotagValue()', () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        component.autotag = <any>{};
        component.setAutotagValue('[someName]');
        expect(component.autotag.value).toBe('[someName]');
    });

    it('should add curly brackets to the value on init', () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        component.autotag = <any>{value: '123', _embedded: {attribute: {}}};
        fixture.detectChanges();
        expect(component.value).toBe('{123}');
    });

    it('should NOT add curly brackets to the value on init if the value is square brackets', () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        component.autotag = <any>{value: '[123]', _embedded: {attribute: {}}};
        fixture.detectChanges();
        expect(component.value).toBe('[123]');
    });
});
