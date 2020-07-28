import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AutotagDropdownComponent } from './autotag-dropdown.component';
import { ChannelService } from '../../../../core/services/channel.service';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('AutotagDropdownComponent', () => {
    let component: AutotagDropdownComponent;
    let fixture: ComponentFixture<AutotagDropdownComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['fetchChannelConstraintCollection']);
        TestBed.configureTestingModule({
            declarations: [AutotagDropdownComponent, HighlightPipe],
            providers: [
                {provide: ChannelService, useValue: channelService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagDropdownComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load options when user types text', fakeAsync(() => {
        component.attribute = <any>{};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        component.control.setValue('');
        tick(300);
        expect(component.options).toEqual(['label1', 'label2']);
    }));

    it('should load options on component init', fakeAsync(() => {
        component.attribute = <any>{taxonomyId: 22, constraintGroupId: 33};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        tick(300);
        expect(component.options).toEqual(['label1', 'label2']);
        expect(channelService.fetchChannelConstraintCollection).toHaveBeenCalledWith(22, 33, '');
    }));

    it('should fetch appropriate resource when user types text', fakeAsync(() => {
        component.attribute = <any>{taxonomyId: 22, constraintGroupId: 33};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        component.control.setValue('fda');
        tick(300);
        expect(channelService.fetchChannelConstraintCollection).toHaveBeenCalledWith(22, 33, 'fda');
    }));

    describe('loadNextPage', () => {

        let event;

        beforeEach(() => {
            event = {stopPropagation: jasmine.createSpy()};
            component.attribute = {taxonomyId: 43, constraintGroupId: 10, id: 1, name: 'someAttribute', isRequired: true};
            component.options = [];
        });
        it('should indicate that loading is in progress', () => {
            channelService.fetchChannelConstraintCollection.and.returnValue(EMPTY);
            component.loadNextPage(event);
            expect(component.loadingNextPage).toBe(true);
        });

        it('should indicate that loading is finished when data received', () => {
            channelService.fetchChannelConstraintCollection.and.returnValue(of(<any>{pages: 1, page: 1, _embedded: {constraint: []}}));
            component.loadNextPage(event);
            expect(component.loadingNextPage).toBe(false);
        });

        it('should add categories from a new page to existing categories', () => {
            channelService.fetchChannelConstraintCollection.and.returnValue(of(<any>{
                pages: 1, page: 1, _embedded: {
                    constraint: [
                        {label: 'three'},
                        {label: 'four'},
                    ]
                }
            }));
            component.options = <any>[
                'one',
                'two'
            ];
            component.loadNextPage(event);
            expect(component.options).toEqual(<any>[
                'one',
                'two',
                'three',
                'four',
            ]);
        });

        it('should set hasNextPage to true if there are more pages', () => {
            component.currentPage = 1;
            channelService.fetchChannelConstraintCollection.and.returnValue(of(<any>{pages: 3, page: 1, _embedded: {constraint: []}}));
            component.loadNextPage(event);
            expect(component.hasNextPage).toBe(true);
        });

        it('should set hasNextPage to false if the last page is loaded', () => {
            component.currentPage = 2;
            channelService.fetchChannelConstraintCollection.and.returnValue(of(<any>{pages: 3, page: 3, _embedded: {constraint: []}}));
            component.loadNextPage(event);
            expect(component.hasNextPage).toBe(false);
        });

        it('should update the current page', () => {
            component.currentPage = 1;
            channelService.fetchChannelConstraintCollection.and.returnValue(of(<any>{pages: 3, page: 2, _embedded: {constraint: []}}));
            component.loadNextPage(event);
            expect(component.currentPage).toBe(2);
        });
    });

});

@Pipe({
    name: 'highlight'
})
class HighlightPipe implements PipeTransform {
    transform() {
        return '';
    }
}
