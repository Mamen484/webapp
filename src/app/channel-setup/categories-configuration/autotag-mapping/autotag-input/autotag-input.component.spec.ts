import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagInputComponent } from './autotag-input.component';
import { FeedService } from '../../../../core/services/feed.service';
import { EMPTY, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AutotagFormStateService } from '../autotag-form-state.service';
import { take } from 'rxjs/operators';
import { AutotagFormState } from '../autotag-form-state.enum';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
            imports: [MatAutocompleteModule, FormsModule, MatInputModule, NoopAnimationsModule, MatFormFieldModule],
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

    it('should change autotagFormState to dirty when input changes', async () => {
        feedService.fetchMappingCollection.and.returnValue(EMPTY);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.debugElement.query(By.css('input'));
        input.nativeElement.value = 'some value that makes input dirty';
        input.triggerEventHandler('input', {target: input.nativeElement});
        fixture.detectChanges();
        await fixture.whenStable();
        const stateService: AutotagFormStateService = TestBed.get(AutotagFormStateService);
        expect(await stateService.getState().pipe(take(1)).toPromise()).toBe(AutotagFormState.dirty);
    });

    it('should change autotagFormState to dirty on setAutotagValue() call', async () => {
        component.setAutotagValue('some value that makes input dirty');
        const stateService: AutotagFormStateService = TestBed.get(AutotagFormStateService);
        expect(await stateService.getState().pipe(take(1)).toPromise()).toBe(AutotagFormState.dirty);
    });
});
