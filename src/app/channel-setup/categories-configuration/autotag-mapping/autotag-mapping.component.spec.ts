import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutotagMappingComponent} from './autotag-mapping.component';
import {Autotag} from '../../autotag';
import {FeedService} from '../../../core/services/feed.service';
import {Component, forwardRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {EMPTY, of, Subject} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PagedResponse} from 'sfl-shared/entities';
import {SuccessSnackbarConfig} from '../../../core/entities/success-snackbar-config';
import {SettingsSavedSnackbarComponent} from '../settings-saved-snackbar/settings-saved-snackbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChannelService} from '../../../core/services/channel.service';

describe('AutotagMappingComponent', () => {
    let component: AutotagMappingComponent;
    let fixture: ComponentFixture<AutotagMappingComponent>;
    let feedService: jasmine.SpyObj<FeedService>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let autotags$: Subject<PagedResponse<{ autotag: Autotag[] }>>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        feedService = jasmine.createSpyObj('FeedService spy', ['fetchAutotagByCategory', 'matchAutotagByCategory']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        autotags$ = new Subject();
        channelService = jasmine.createSpyObj('ChannelService spy', ['fetchChannelConstraintCollection']);

        TestBed.configureTestingModule({
            declarations: [AutotagMappingComponent, AutotagInputMockComponent, AutotagDropdownMockComponent],
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: ChannelService, useValue: channelService},
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
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(1);
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(0);
    });

    it('should display an autotag dropdown if attribute group id is constrained', () => {
        component.autotagList = <Autotag[]>[{
            _embedded: {attribute: {constraintGroupId: 1}}
        }];
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-input').length).toBe(0);
        expect(fixture.debugElement.nativeElement.querySelectorAll('sf-autotag-dropdown').length).toBe(1);
    });

    it('should display only required attributes without a default value', () => {
        component.ngOnChanges({});
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

    it('should display both an autotag input and autotag dropdown if autotag has mixed attribute ids', () => {
        component.autotagList = <Autotag[]>[
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 1}}},
            {_embedded: {attribute: {constraintGroupId: null}}},
            {_embedded: {attribute: {constraintGroupId: 2}}},
            {_embedded: {attribute: {constraintGroupId: 3}}},
        ];
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
        feedService.matchAutotagByCategory.and.returnValue((EMPTY));
        component.form = <any>{controls: {}, invalid: false};
        component.saveMatching();
        expect(feedService.matchAutotagByCategory.calls.count()).toBe(5);
    });
    
    it('should empty autotags list and fetch a new autotags list when the catalogCategoryId input property changes it`s value', () => {
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledTimes(0);
        component.autotagList = <any>[{_embedded: {attribute: {}}}];
        component.ngOnChanges({});
        expect(component.autotagList.length).toBe(0);
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledTimes(1);
    });

    it('should NOT show any content when autotagList is empty', () => {
        component.autotagList = [];
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('');
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
