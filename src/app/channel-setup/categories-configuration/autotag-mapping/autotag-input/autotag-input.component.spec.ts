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
        component.ngOnInit();
        component.value = 'str';
        component.createSuggestions();
        expect(component.suggestions).toEqual(['[str]', '{someString}', '{String1234}', '{123str}']);
    });

    it('should not display a static value if an input is empty', () => {
        feedService.fetchMappingCollection.and.returnValue(of({
            count: 1, _embedded: {
                mapping: [
                    {catalogField: 'someString', standardField: ''},
                ]
            }
        }));
        component.ngOnInit();
        component.value = '';
        component.createSuggestions();
        expect(component.suggestions).toEqual(['{someString}']);
    });

    it('should save autotag value on setAutotagValue()', async () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        const changed = component.changed.asObservable().take(1).toPromise();
        component.setAutotagValue('{someName}');
        expect(await changed).toBe('{someName}');
    });

    it('should NOT remove square brackets from autotag value on setAutotagValue()', async () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        const changed = component.changed.asObservable().take(1).toPromise();
        component.setAutotagValue('[someName]');
        expect(await changed).toBe('[someName]');
    });
});
