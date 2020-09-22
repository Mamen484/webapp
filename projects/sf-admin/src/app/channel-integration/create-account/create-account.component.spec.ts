import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAccountComponent} from './create-account.component';
import {ChannelService, StoreService} from 'sfl-shared/services';
import {ChannelPermissionService} from '../channel-permission.service';
import {EMPTY, of, throwError} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CountryAutocompleteStubComponent} from '../../../../../../src/app/orders/order-details/address-form/address-form.component.spec';
import {CredentialsDialogComponent} from './credentials-dialog/credentials-dialog.component';
import {By} from '@angular/platform-browser';
import {StoreStatus} from 'sfl-shared/entities';
import {UnsavedDataDialogComponent} from 'sfl-tools/unsaved-data-guard';

describe('CreateAccountComponent', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;
    let storeService: jasmine.SpyObj<StoreService>;
    let channelPermissionService: jasmine.SpyObj<ChannelPermissionService>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let matDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async(() => {
        storeService = jasmine.createSpyObj('StoreService spy', ['createStore']);
        channelPermissionService = jasmine.createSpyObj('ChannelPermissionService spy', ['addChannelPermission']);
        channelService = jasmine.createSpyObj('ChannelService spy', ['createChannel', 'listChannels']);
        matDialog = jasmine.createSpyObj('MatDialog spy', ['open']);

        TestBed.configureTestingModule({
            declarations: [CreateAccountComponent, CountryAutocompleteStubComponent],
            providers: [
                {provide: StoreService, useValue: storeService},
                {provide: ChannelPermissionService, useValue: channelPermissionService},
                {provide: ChannelService, useValue: channelService},
                {provide: MatDialog, useValue: matDialog},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ],
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('save button click', () => {
        it('should NOT create an account if specified channel does exist', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 1}));
            storeService.createStore.and.returnValue(EMPTY);

            setFormValue();
            component.save();

            expect(storeService.createStore).not.toHaveBeenCalled();

        });

        it('should create an account if specified channel does not exist', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            storeService.createStore.and.returnValue(EMPTY);

            setFormValue();
            component.save();

            expect(storeService.createStore).toHaveBeenCalledWith({
                owner: {
                    email: 'channel-owner@gmail.com',
                    login: 'channel-owner',
                    password: 'qwerty123',
                    payment: 'other',
                },
                country: 'es',
                status: StoreStatus.demo,
                feed: {
                    url: 'https://raw.githubusercontent.com/shoppingflux/feed-xml/develop/examples/full.xml',
                    source: 'xml',
                    mapping: {
                        brand: 'brand',
                        category: 'category',
                        description: 'description',
                        ean: 'ean',
                        ecotax: 'ecotax',
                        link: 'link',
                        name: 'name',
                        old_price: 'old_price',
                        price: 'price',
                        quantity: 'quantity',
                        reference: 'reference',
                        shipping_cost: 'shipping_cost',
                        shipping_time: 'shipping_time',
                        short_description: 'short_description',
                        tva: 'tva',
                        weight: 'weight',
                    }
                },
            });
        });

        it('should create a channel', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(EMPTY);
            storeService.createStore.and.returnValue(<any>of({id: 789, owner: {id: 9890}}));

            setFormValue();
            component.save();
            expect(channelService.createChannel).toHaveBeenCalledWith({
                name: 'A testing channel',
                type: 'ads',
                country: [{code: 'es'}],
                feedType: 'xml',
                feed: {
                    head: 'Some text 1',
                    productTag: 'a',
                    separator: '',
                    enclosure: '',
                    headerFirst: '',
                }
            });
        });

        it('should create a channel permission', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(of(<any>{id: 222}));
            channelPermissionService.addChannelPermission.and.returnValue(EMPTY);
            storeService.createStore.and.returnValue(of(<any>{id: 111, owner: {id: 9090}}));

            setFormValue();
            component.save();

            expect(channelPermissionService.addChannelPermission).toHaveBeenCalledWith(222, 9090, ['edit']);
        });

        it('should show a credentials dialogs if store, channel and permission created successfully', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(of(<any>{id: 222}));
            channelPermissionService.addChannelPermission.and.returnValue(of({}));
            storeService.createStore.and.returnValue(of(<any>{id: 111, owner: {}}));

            setFormValue();
            component.save();

            expect(matDialog.open).toHaveBeenCalledWith(CredentialsDialogComponent, {
                data: {
                    channelName: 'A testing channel',
                    login: 'channel-owner',
                    password: 'qwerty123',
                }
            });
        });

        it('should clear the error message', () => {
            component.errorMessage = 'some error message';
            channelService.listChannels.and.returnValue(EMPTY);
            component.save();
            expect(component.errorMessage).not.toBeDefined();
        });

        it('should clear validationMessages', () => {
            component.validationMessages = {owner: {login: {alreadyExists: 'Specified login already exists'}}};
            channelService.listChannels.and.returnValue(EMPTY);
            component.save();
            expect(component.validationMessages).toEqual({});
        });
    });

    describe('server error message', () => {
        it('should show if a channel exists', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 1}));
            storeService.createStore.and.returnValue(EMPTY);

            setFormValue();
            component.save();
            expect(component.errorMessage).toBe('Channel error: channel already exists');
        });

        it('should show if a create store returns an error', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            storeService.createStore.and.returnValue(throwError({error: {detail: 'some error message'}}));

            setFormValue();
            component.save();
            expect(component.errorMessage).toBe('Account error: some error message');
        });

        it('should show if a create channel returns an error', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(throwError({error: {detail: 'some error message'}}));
            storeService.createStore.and.returnValue(<any>of({id: 789, owner: {}}));

            setFormValue();
            component.save();
            expect(component.errorMessage).toBe('Channel error: some error message');
        });

        it('should show if a create channel permission returns an error', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(of(<any>{id: 222}));
            channelPermissionService.addChannelPermission.and.returnValue(throwError({error: {detail: 'some error message'}}));
            storeService.createStore.and.returnValue(of(<any>{id: 111, owner: {}}));

            setFormValue();
            component.save();
            expect(component.errorMessage).toBe('Association error: some error message');
        });
    });

    describe('server validation', () => {
        it('should show a server validation message for login if exists', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            storeService.createStore.and.returnValue(throwError({
                error: {
                    validationMessages: {
                        owner: {
                            login: {alreadyExists: 'The login already exists'},
                            email: {alreadyExists: 'The email already exists'},
                            password: {alreadyExists: 'The password already exists'}
                        }
                    }
                }
            }));
            setFormValue();
            component.save();
            expect(component.formGroup.controls.login.getError('validationError')).toBe('The login already exists');
            expect(component.formGroup.controls.email.getError('validationError')).toBe('The email already exists');
            expect(component.formGroup.controls.email.getError('validationError')).toBe('The email already exists');
            expect(component.formGroup.controls.password.getError('validationError')).toBe('The password already exists');
        });

        it('should show a server validation message for channel name if exists on fetch channels list', () => {
            channelService.listChannels.and.returnValue(throwError({
                error: {
                    validationMessages: {
                        name: {alreadyExists: 'some error message'},
                    }
                }
            }));

            setFormValue();
            fixture.detectChanges();
            component.save();
            expect(component.formGroup.controls.channelName.getError('validationError')).toBe('some error message');
        });

        it('should show a server validation messages for create channel', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            storeService.createStore.and.returnValue(of(<any>{id: 22, owner: {}}));
            channelService.createChannel.and.returnValue(throwError({
                error: {
                    validationMessages: {
                        name: {someError: 'some error message'},
                        type: {someError: 'some error message'},
                        feedType: {someError: 'some error message'},
                        feed: {
                            separator: {someError: 'some error message'},
                            enclosure: {someError: 'some error message'},
                            head: {someError: 'some error message'},
                            productTag: {someError: 'some error message'},
                        }
                    }
                }
            }));

            setFormValue();
            component.save();
            expect(component.formGroup.controls.channelName.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.channelType.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.exportType.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.head.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.productTag.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.separator.getError('validationError')).toBe('some error message');
            expect(component.formGroup.controls.enclosure.getError('validationError')).toBe('some error message');
        });
    });

    describe('unsaved data', () => {
        it('should return false on hasModifications() call if form was not touched', () => {
            expect(component.hasModifications()).toBe(false);
        });

        it('should return true on hasModifications() call if any form field has value', () => {
            triggerInput();
            expect(component.hasModifications()).toBe(true);
        });

        it('should return false on hasModifications() call if any form field has value, but the form was successfully saved', () => {
            channelService.listChannels.and.returnValue(of(<any>{total: 0}));
            channelService.createChannel.and.returnValue(of(<any>{id: 222}));
            channelPermissionService.addChannelPermission.and.returnValue(of({}));
            storeService.createStore.and.returnValue(of(<any>{id: 111, owner: {}}));
            setFormValue();
            triggerInput();
            expect(component.hasModifications()).toBe(true);
            component.save();
            fixture.detectChanges();

            expect(component.hasModifications()).toBe(false);
        });

        it('should show a dialog on showCloseDialog()', () => {
            matDialog.open.and.returnValue(<any>{
                afterClosed: () => {
                }
            });
            component.showCloseDialog();
            expect(matDialog.open).toHaveBeenCalledWith(UnsavedDataDialogComponent);
        });

        function triggerInput() {
            const input = fixture.debugElement.query(By.css('input'));
            input.nativeElement.value = 'test text';
            input.triggerEventHandler('input', {target: input.nativeElement});
            fixture.detectChanges();
        }
    });


    function setFormValue() {
        component.formGroup.setValue({
            login: 'channel-owner',
            email: 'channel-owner@gmail.com',
            password: 'qwerty123',
            channelName: 'A testing channel',
            channelType: 'ads',
            country: 'es',
            exportType: 'xml',
            head: 'Some text 1',
            productTag: 'a',
            separator: '',
            enclosure: '',
            headerInFirstRaw: '',
        });
    }
})
;
