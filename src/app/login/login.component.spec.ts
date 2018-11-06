import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SflAuthService} from 'sfl-shared/src/lib/auth';
import { SflUserService, SflWindowRefService } from 'sfl-shared/src/lib/core/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { AggregatedUserInfo } from 'sfl-shared/src/lib/core/entities';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: jasmine.SpyObj<SflUserService>;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(async(() => {
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        authService = jasmine.createSpyObj('SflAuthService', ['login', 'logout']);
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                {provide: SflUserService, useValue: userService},
                {provide: SflAuthService, useValue: authService},
                {
                    provide: SflWindowRefService,
                    useValue: {
                        nativeWindow: {
                            location: {href: ''},
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

    it('should call user service login() call', () => {
        authService.login.and.returnValue(of({}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        component.login({username: '123', password: 'asf'});
        expect(authService.login).toHaveBeenCalledWith('123', 'asf');
    });

    it('should write the error when the SflUserService returns an error', () => {
        authService.login.and.returnValue(throwError({error: {detail: 'bubidu'}}));
        component.login({username: '123', password: '456'});
        expect(component.error).toEqual('bubidu');
    });

    it('should show an error that the store is deleted, when all the stores in the userInfo have deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'deleted';
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
        authService.login.and.returnValue(of({}));
        component.login({username: '123', password: '456'});
        expect(component.showDeletedStoreError).toEqual(true);
    });

    it('should drop authorization, when all the stores in the userInfo have deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'deleted';
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
        authService.login.and.returnValue(of({}));
        component.login({username: '123', password: '456'});
        expect(authService.logout).toHaveBeenCalled();
    });

    it('should NOT show an error that the store is deleted, when at least one store in the userInfo has deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'suspended';
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
        authService.login.and.returnValue(of({}));
        component.login({username: '123', password: '456'});
        expect(component.showDeletedStoreError).toEqual(false);
    });
});
