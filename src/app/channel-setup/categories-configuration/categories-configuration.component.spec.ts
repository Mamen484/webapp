import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesConfigurationComponent } from './categories-configuration.component';
import { Directive, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteModule, MatDialog } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { FeedService } from '../../core/services/feed.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CategoriesConfigurationComponent', () => {
    let component: CategoriesConfigurationComponent;
    let fixture: ComponentFixture<CategoriesConfigurationComponent>;

    @Directive({selector: '[sfLegacyLink]'})
    class LegacyLinkMockDirective {
    }

    @Pipe({name: 'sfChannelLink'})
    class ChannelLinkMockPipe implements PipeTransform {
        transform() {
        }
    }

    let matDialog: jasmine.SpyObj<MatDialog>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let route: jasmine.SpyObj<{data: Subject<any>}>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection']);
        route = {data: new Subject()};
        TestBed.configureTestingModule({
            declarations: [CategoriesConfigurationComponent, LegacyLinkMockDirective, ChannelLinkMockPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: ActivatedRoute, useValue: route},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
