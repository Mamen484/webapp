import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { ChannelService, StoreService } from 'sfl-shared/services';
import { ChannelPermissionService } from '../channel-permission.service';
import { EMPTY, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('CreateAccountComponent', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;
    let storeService: jasmine.SpyObj<StoreService>;
    let channelPermissionService: jasmine.SpyObj<ChannelPermissionService>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        storeService = jasmine.createSpyObj('StoreService spy', ['createStore']);
        channelPermissionService = jasmine.createSpyObj('ChannelPermissionService spy', ['addChannelPermission']);
        channelService = jasmine.createSpyObj('ChannelService spy', ['createChannel', 'listChannels']);
        TestBed.configureTestingModule({
            declarations: [CreateAccountComponent],
            providers: [
                {provide: StoreService, useValue: storeService},
                {provide: ChannelPermissionService, useValue: channelPermissionService},
                {provide: ChannelService, useValue: channelService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [ReactiveFormsModule, MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should NOT create an account on a form save if specified channel does exist', () => {
        channelService.listChannels.and.returnValue(of(<any>{total: 1}));
        storeService.createStore.and.returnValue(EMPTY);

        setFormValue();
        component.save();

        expect(storeService.createStore).not.toHaveBeenCalled();

    });

    it('should create an account on a form save if specified channel does not exist', () => {
        channelService.listChannels.and.returnValue(of(<any>{total: 0}));
        storeService.createStore.and.returnValue(EMPTY);

        setFormValue();
        component.save();

        expect(storeService.createStore).toHaveBeenCalledWith({
            owner: {
                email: 'channel-owner@gmail.com',
                login: 'channel-owner',
                password: 'qwerty123',
            },
            country: 'es',
            feed: {
                url: 'https://raw.githubusercontent.com/shoppingflux/feed-xml/develop/examples/full.xml',
                source: 'xml',
            },
        });
    });

    it('should create a channel on a form save', () => {
        channelService.listChannels.and.returnValue(of(<any>{total: 0}));
        channelService.createChannel.and.returnValue(EMPTY);
        storeService.createStore.and.returnValue(<any>of({id: 789}));

        setFormValue();
        component.save();
        expect(channelService.createChannel).toHaveBeenCalledWith({
            name: 'A testing channel',
            type: 'ads',
            countries: [{code: 'es'}],
            feedType: 'xml',
            feed: {
                head: 'Some text 1',
                productTag: 'Some text 2',
                separator: '',
                enclosure: '',
                headerFirst: '',
            }
        });
    });

    it('should create a channel permission on a form save', () => {
        channelService.listChannels.and.returnValue(of(<any>{total: 0}));
        channelService.createChannel.and.returnValue(of(<any>{id: 222}));
        channelPermissionService.addChannelPermission.and.returnValue(EMPTY);
        storeService.createStore.and.returnValue(of(<any>{id: 111}));

        setFormValue();
        component.save();

        expect(channelPermissionService.addChannelPermission).toHaveBeenCalledWith(222, 111, []);
    });

    function setFormValue() {
        component.formGroup.setValue({
            login: 'channel-owner',
            email: 'channel-owner@gmail.com',
            password: 'qwerty123',
            channelName: 'A testing channel',
            channelType: 'ads',
            country: {code: 'es'},
            exportType: 'xml',
            xmlHead: 'Some text 1',
            xmlProductTag: 'Some text 2',
            csvSeparator: '',
            csvRoundTrip: '',
            headerInFirstRaw: '',
        });
    }
});
