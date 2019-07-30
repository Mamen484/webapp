import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagMappingComponent } from './autotag-mapping.component';
import { Autotag } from '../../autotag';
import { FeedService } from '../../../core/services/feed.service';
import { Component, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { EMPTY, of, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PagedResponse } from 'sfl-shared/entities';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { MappingCacheService } from '../mapping-cache.service';
import { autotagsMock } from './autotags-mock';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('AutotagMappingComponent', () => {
    let component: AutotagMappingComponent;
    let fixture: ComponentFixture<AutotagMappingComponent>;
    let feedService: jasmine.SpyObj<FeedService>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let autotags$: Subject<PagedResponse<{ autotag: Autotag[] }>>;
    let mappingCacheService: jasmine.SpyObj<MappingCacheService>;

    beforeEach(async(() => {
        feedService = jasmine.createSpyObj('FeedService spy', ['fetchAutotagByCategory', 'matchAutotagByCategory']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        autotags$ = new Subject();
        mappingCacheService = jasmine.createSpyObj('MappingCacheService spy', ['getAutotagMapping', 'hasAutotagMapping', 'addAutotagMapping']);

        TestBed.configureTestingModule({
            declarations: [AutotagMappingComponent, AutotagInputMockComponent, AutotagDropdownMockComponent],
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: MappingCacheService, useValue: mappingCacheService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule, FlexLayoutModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        feedService.fetchAutotagByCategory.and.returnValue(autotags$);
        fixture = TestBed.createComponent(AutotagMappingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an autotag input if attribute group id is NOT constrained', () => {
        component.autotagList = <Autotag[]>[{
            _embedded: {attribute: {constraintGroupId: null}}
        }];
        component.loadedFields = 1;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(1);
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(0);
    });

    it('should display an autotag dropdown if attribute group id is constrained', () => {
        component.autotagList = <Autotag[]>[{
            _embedded: {attribute: {constraintGroupId: 1}}
        }];
        component.loadedFields = 1;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(0);
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(1);
    });

    it('should display both an autotag input and autotag dropdown if autotag has mixed attribute ids', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 2}}},
            {_embedded: {attribute: {constraintGroupId: 3}}},
        ];
        component.loadedFields = 5;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(2);
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(3);
    });

    it('should show a snackbar on a successful autotags save', () => {
        component.autotagList = <Autotag[]>[{_embedded: {attribute: {constraintGroupId: null}}}];
        feedService.matchAutotagByCategory.and.returnValue(of({}));
        component.form = <any>{controls: {}, invalid: false};
        component.saveMatching();
        expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(SettingsSavedSnackbarComponent, new SuccessSnackbarConfig());
    });

    it('should send as many matchAutotagByCategory requests as autotags', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 2}}},
            {_embedded: {attribute: {constraintGroupId: 3}}},
        ];
        component.loadedFields = 5;
        feedService.matchAutotagByCategory.and.returnValue((EMPTY));
        component.form = <any>{controls: {}, invalid: false};
        component.saveMatching();
        expect(feedService.matchAutotagByCategory.calls.count()).toBe(5);
    });

    it('should display only required attributes', () => {
        autotags$.next(<any>{
            _embedded: {
                autotag: [
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 1, isRequired: false}}},
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: false}}},
                    {_embedded: {attribute: {constraintGroupId: 2, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 3, isRequired: false}}},
                ]
            }
        });

        expect(component.autotagList.length).toBe(2);
    });

    it('should emit autotagLoaded event when all autotag fields loaded', () => {
        let spy = spyOn(component.autotagsLoaded, 'emit');
        autotags$.next(<any>{
            _embedded: {
                autotag: [
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 1, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 2, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 3, isRequired: true}}},
                ]
            },
        });

        component.markLoadingProgress();
        expect(spy).not.toHaveBeenCalled();
        component.markLoadingProgress();
        expect(spy).not.toHaveBeenCalled();
        component.markLoadingProgress();
        expect(spy).not.toHaveBeenCalled();
        component.markLoadingProgress();
        expect(spy).not.toHaveBeenCalled();

        component.markLoadingProgress();
        expect(spy).toHaveBeenCalled();
    });

    it('should empty autotags list and fetch a new autotags list when the catalogCategoryId input property changes it`s value', () => {
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledTimes(1);
        component.autotagList = <any>[{_embedded: {attribute: {}}}];
        component.ngOnChanges({});
        expect(component.autotagList.length).toBe(0);
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledTimes(2);
    });

    it('should set hasCachedMapping to true when the autotag mapping cache saved', () => {
        mappingCacheService.hasAutotagMapping.and.returnValue(true);
        component.ngOnChanges({});
        expect(component.hasCachedMapping).toBe(true);
    });

    it('should set hasCachedMapping to false when the autotag mapping cache NOT saved', () => {
        mappingCacheService.hasAutotagMapping.and.returnValue(false);
        component.ngOnChanges({});
        expect(component.hasCachedMapping).toBe(false);
    });

    it('should save autotag cache when autotags saved', () => {
        component.autotagList = <Autotag[]>[{_embedded: {attribute: {constraintGroupId: null}}}];
        feedService.matchAutotagByCategory.and.returnValue(of({}));
        component.form = <any>{controls: {}, invalid: false};
        component.channelCategoryId = 45;
        component.catalogCategoryId = 90;
        component.feedId = 118;
        component.saveMatching();
        expect(mappingCacheService.addAutotagMapping).toHaveBeenCalledWith(45, 90, 118);
    });

    it('should reset autotag values when USE previous button clicked', () => {
        mappingCacheService.getAutotagMapping.and.returnValue(of(<any>[
            {id: 15, _embedded: {attribute: {isRequired: true}}},
            {id: 22, _embedded: {attribute: {isRequired: true}}},
            {id: 31, _embedded: {attribute: {isRequired: true}}},
        ]));
        component.usePreviousMapping();
        expect(component.autotagList.map(autotag => ({id: autotag.id})))
            .toEqual(<any>[{id: 15}, {id: 22}, {id: 31}]);

    });

    it('should pass values from previous mapping to a server', () => {
        component.form = <any>{controls: {}, invalid: false};
        feedService.matchAutotagByCategory.and.returnValue(EMPTY);
        mappingCacheService.getAutotagMapping.and.returnValue(of(<any>[
            {id: 15, value: 'some value 1', _embedded: {attribute: {isRequired: true}}},
            {id: 22, value: 'some value 2', _embedded: {attribute: {isRequired: true}}},
            {id: 31, value: 'some value 3', _embedded: {attribute: {isRequired: true}}},
        ]));
        component.usePreviousMapping();
        component.saveMatching();
        expect(feedService.matchAutotagByCategory).toHaveBeenCalledTimes(3);
        expect(feedService.matchAutotagByCategory.calls.argsFor(0)[3]).toBe('some value 1');
        expect(feedService.matchAutotagByCategory.calls.argsFor(1)[3]).toBe('some value 2');
        expect(feedService.matchAutotagByCategory.calls.argsFor(2)[3]).toBe('some value 3');

    });

    it('should assign equal values to autotagList on OnChanges() and on usePreviousMapping()', () => {
        feedService.fetchAutotagByCategory.and.returnValue(of(autotagsMock));
        mappingCacheService.getAutotagMapping.and.returnValue(of(autotagsMock._embedded.autotag));
        component.ngOnChanges({});
        expect(component.autotagList.length).toBe(8);
        const onChangesList = JSON.stringify(component.autotagList);
        component.autotagList = [];
        component.usePreviousMapping();
        const previousMappingList = JSON.stringify(component.autotagList);

        expect(onChangesList).toBe(previousMappingList);
    });

    it('should NOT show any content when autotagList is empty', () => {
        component.autotagList = [];
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('');
    });

    it('should hide all content when autotagList has more items then returned loaded event', () => {
        component.autotagList = <any>[
            {id: 15, value: 'some value 1', _embedded: {attribute: {isRequired: true}}},
            {id: 22, value: 'some value 2', _embedded: {attribute: {isRequired: true}}},
            {id: 31, value: 'some value 3', _embedded: {attribute: {isRequired: true}}},
        ];
        component.loadedFields = 2;
        fixture.detectChanges();
        const elem = fixture.debugElement.nativeElement;
        expect((<HTMLDivElement>elem.querySelector('.autotag-mapping-header')).style.display).toBe('none');
        expect((<HTMLDivElement>elem.querySelector('.autotag-mapping-header + div')).style.display).toBe('none');
    });


    it('should show only the header when a previous mapping is being loaded ', () => {
        component.autotagList = <any>[
            {id: 15, value: 'some value 1', _embedded: {attribute: {isRequired: true}}},
            {id: 22, value: 'some value 2', _embedded: {attribute: {isRequired: true}}},
            {id: 31, value: 'some value 3', _embedded: {attribute: {isRequired: true}}},
        ];
        component.loadedFields = 2;
        component.loadingPreviousMapping = true;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('.autotag-mapping-header')).toBeTruthy();
    });

});

export class AutotagControlMockComponent implements ControlValueAccessor {
    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }
}

@Component({
    selector: 'sf-autotag-input',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutotagInputMockComponent),
        multi: true
    }],
    template: '',
})
export class AutotagInputMockComponent extends AutotagControlMockComponent {
}

@Component({
    selector: 'sf-autotag-dropdown',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutotagDropdownMockComponent),
        multi: true
    }],
    template: '',
})
export class AutotagDropdownMockComponent extends AutotagControlMockComponent {
}
