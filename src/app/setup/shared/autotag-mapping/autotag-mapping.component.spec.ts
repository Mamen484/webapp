import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagMappingComponent } from './autotag-mapping.component';
import { Autotag } from '../../autotag';
import { Component, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PagedResponse } from 'sfl-shared/entities';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AttributesUpdateErrorSnackbarComponent } from './attributes-update-error-snackbar/attributes-update-error-snackbar.component';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { CategoryMappingService, Mapping } from '../category-mapping.service';
import { AutotagService } from './autotag-service';
import { tap } from 'rxjs/operators';

describe('AutotagMappingComponent', () => {
    let component: AutotagMappingComponent;
    let fixture: ComponentFixture<AutotagMappingComponent>;
    let autotagService: jasmine.SpyObj<AutotagService>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let autotags$: Subject<PagedResponse<{ autotag: Autotag[] }>>;
    let categoryMappingService: jasmine.SpyObj<CategoryMappingService>;
    let categoryMapping$: Subject<{
        fromCache: boolean,
        mapping: Mapping
    }>;

    beforeEach(async(() => {
        autotagService = jasmine.createSpyObj('AutotagService spy', ['fetchAutotagList', 'matchAutotag']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        autotags$ = new Subject();
        categoryMappingService = jasmine.createSpyObj('CategoryMappingService spy', ['saveNewMapping', 'getCurrentMapping']);
        categoryMapping$ = new Subject();
        categoryMappingService.getCurrentMapping.and.returnValue(categoryMapping$);

        TestBed.configureTestingModule({
            declarations: [AutotagMappingComponent, AutotagInputMockComponent, AutotagDropdownMockComponent],
            providers: [
                {provide: AutotagService, useValue: autotagService},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: CategoryMappingService, useValue: categoryMappingService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule, FlexLayoutModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        autotagService.fetchAutotagList.and.returnValue(autotags$);
        fixture = TestBed.createComponent(AutotagMappingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display only required attributes without a default value', () => {
        categoryMapping$.next(<any>{mapping: {channelCategory: null}});
        autotags$.next(<any>{
            _embedded: {
                autotag: [
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: null, isRequired: true, defaultMapping: 'some mapping'}}},
                    {_embedded: {attribute: {constraintGroupId: 2, isRequired: true}}},
                    {_embedded: {attribute: {constraintGroupId: 3, isRequired: true, defaultMapping: 'some mapping'}}},
                ]
            }
        });
        expect(component.autotagList.length).toBe(2);
    });

    it('should show a snackbar on a successful autotags save', () => {
        component.autotagList = <Autotag[]>[{_embedded: {attribute: {constraintGroupId: null}}}];
        component.optionalAutotagsList = [];
        autotagService.matchAutotag.and.returnValue(of({}));
        component.form = <any>{controls: {}, invalid: false};
        component.setAutotagValue(component.autotagList[0], 'someValue');
        component.saveMatching();
        expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(SettingsSavedSnackbarComponent, new SuccessSnackbarConfig());
    });

    it('should not proceed to save if there are no modified inputs', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        component.saveMatching();
        expect(component.saveInProgress).toBe(false);
        expect(autotagService.matchAutotag).not.toHaveBeenCalled();
    });

    it('should proceed to save if there is one required attribute that is modified', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        autotagService.matchAutotag.and.returnValue(EMPTY);
        component.saveMatching();
        expect(component.saveInProgress).toBe(true);
        expect(autotagService.matchAutotag).toHaveBeenCalled();
    });

    it('should proceed to save if there is one optional attribute that is modified', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        autotagService.matchAutotag.and.returnValue(EMPTY);
        component.saveMatching();
        expect(component.saveInProgress).toBe(true);
        expect(autotagService.matchAutotag).toHaveBeenCalled();
    });

    it('should send matchAutotag requests for each modified autotag', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 2}}},
            {_embedded: {attribute: {constraintGroupId: 3}}},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 2}}},
            {_embedded: {attribute: {constraintGroupId: 3}}},
        ];
        autotagService.matchAutotag.and.returnValue((EMPTY));
        component.form = <any>{controls: {}, invalid: false};
        component.setAutotagValue(component.autotagList[0], 'seomValue1');
        component.setAutotagValue(component.autotagList[1], 'seomValue2');
        component.setAutotagValue(component.optionalAutotagsList[3], 'seomValue3');
        component.setAutotagValue(component.optionalAutotagsList[4], 'seomValue4');
        component.saveMatching();
        expect(autotagService.matchAutotag.calls.count()).toBe(4);
    });

    it('should empty autotags list and fetch a new autotags list when the catalogCategoryId input property changes it`s value', () => {
        expect(autotagService.fetchAutotagList).toHaveBeenCalledTimes(0);
        component.autotagList = <any>[{_embedded: {attribute: {}}}];
        component.optionalAutotagsList = <any>[{_embedded: {attribute: {}}}];
        categoryMapping$.next(<any>{mapping: {channelCategory: null}});
        expect(component.autotagList.length).toBe(0);
        expect(autotagService.fetchAutotagList).toHaveBeenCalledTimes(2);
        expect(autotagService.fetchAutotagList.calls.argsFor(0)[2].requirement).toBe('required');
        expect(autotagService.fetchAutotagList.calls.argsFor(1)[2].requirement).toBe('optional');

    });

    it('should show an error snackbar if any match attribute request returned an error', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}, modified: true},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        autotagService.matchAutotag.and.returnValues(
            throwError({}),
            throwError({}),
            of({}),
        );
        component.saveMatching();
        expect(autotagService.matchAutotag).toHaveBeenCalledTimes(3);
        expect(matSnackBar.openFromComponent).toHaveBeenCalledTimes(1);
        expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(AttributesUpdateErrorSnackbarComponent, new ErrorSnackbarConfig());
    });

    it('should show an error snackbar if any match attribute request returned an error', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}, modified: true},
        ];
        component.optionalAutotagsList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}, modified: true},
            {_embedded: {attribute: {constraintGroupId: 1}}},
        ];
        autotagService.matchAutotag.and.returnValues(
            throwError({}),
            throwError({}),
            of({}),
        );
        component.saveMatching();
        expect(autotagService.matchAutotag).toHaveBeenCalledTimes(3);
        expect(matSnackBar.openFromComponent).toHaveBeenCalledTimes(1);
        expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(AttributesUpdateErrorSnackbarComponent, new ErrorSnackbarConfig());
    });

    it('should unsubscribe from categoryMappingSubscription when the component destroys', () => {
        const subject = new Subject<{ fromCache: boolean; mapping: Mapping }>();
        let counter = 0;
        categoryMappingService.getCurrentMapping.and.returnValue(subject.asObservable().pipe(tap(() => counter += 1)));
        for (let i = 0; i < 10; i++) {
            fixture.destroy();
            fixture = TestBed.createComponent(AutotagMappingComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }

        subject.next({fromCache: false, mapping: {catalogCategoryId: 22, feedId: 2, channelCategory: null}});
        expect(counter).toBe(1);
        subject.unsubscribe();

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
