
import {throwError, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../core/services/user.service';
import { SflLocaleIdService } from 'sfl-shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { LegacyLinkService } from '../core/services/legacy-link.service';
import { SflWindowRefService } from 'sfl-shared';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    let fetchAggregatedinfoSpy: jasmine.Spy;

    beforeEach(async(() => {
        loginSpy = jasmine.createSpy('login');
        fetchAggregatedinfoSpy = jasmine.createSpy('fetchAggregatedInfo');
        navigateSpy = jasmine.createSpy('navigate');
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                {provide: UserService, useValue: ({login: loginSpy, fetchAggregatedInfo: fetchAggregatedinfoSpy})},
                {provide: SflLocaleIdService, useValue: ({localeId: 'en'})},
                {provide: Router, useValue: {navigate: navigateSpy}},
                {
                    provide: LegacyLinkService, useValue: {
                    getLegacyLink: () => {
                    }
                }
                },
                {
                    provide: SflWindowRefService,
                    useValue: {
                        nativeWindow: {
                            location: {href: ''},
                            localStorage: {
                                removeItem: () => {
                                }
                            }
                        }
                    }
                },

            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should not call user service when the username is empty', () => {
        component.userNameControl.setValue('123');
        component.login();
        expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should not call user service when the password is empty', () => {
        component.passwordControl.setValue('123');
        component.login();
        expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should call user service with correct username and password', () => {
        loginSpy.and.returnValue(of({}));
        fetchAggregatedinfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(loginSpy).toHaveBeenCalledWith('123', 'asf');
    });

    it('should write the error when the UserService returns an error', () => {
        loginSpy.and.returnValue(throwError({error: {detail: 'bubidu'}}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.error).toEqual('bubidu');
    });

    it('should show an error that the store is deleted, when all the stores in the userInfo have deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'deleted';
        fetchAggregatedinfoSpy.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
        loginSpy.and.returnValue(of({}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.showDeletedStoreError).toEqual(true);
    });

    it('should NOT show an error that the store is deleted, when at least one store in the userInfo has deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'suspended';
        fetchAggregatedinfoSpy.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
        loginSpy.and.returnValue(of({}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.showDeletedStoreError).toEqual(false);
    });
});
