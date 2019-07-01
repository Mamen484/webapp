import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagMappingComponent } from './autotag-mapping.component';
import { Autotag } from '../../autotag';
import { FeedService } from '../../../core/services/feed.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EMPTY } from 'rxjs';

describe('AutotagMappingComponent', () => {
    let component: AutotagMappingComponent;
    let fixture: ComponentFixture<AutotagMappingComponent>;
    let feedService: jasmine.SpyObj<FeedService>;

    beforeEach(async(() => {
        feedService = jasmine.createSpyObj('FeedService spy', ['fetchAutotagByCategory', 'matchAutotagByCategory']);
        TestBed.configureTestingModule({
            declarations: [AutotagMappingComponent],
            providers: [
                {provide: FeedService, useValue: feedService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        feedService.fetchAutotagByCategory.and.returnValue(EMPTY);
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
});
