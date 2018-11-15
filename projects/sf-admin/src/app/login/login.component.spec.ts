import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SflAuthService, SflUserService } from 'sfl-shared/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: jasmine.SpyObj<SflUserService>;
    let authService: jasmine.SpyObj<SflAuthService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        authService = jasmine.createSpyObj('SflAuthService', ['login', 'logout']);
        router = jasmine.createSpyObj('Router', ['navigate']);
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
                {provide: Router, useValue: router},
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

});


export const aggregatedUserInfoMock = {
    'token': 'turudum',
    'login': 'admin',
    'email': 'clement@shopping-feed.com',
    'roles': <any>['user'],
    'language': 'it_IT',
    '_links': {'self': {'href': '/v1/me'}},
    '_embedded': <any>{
        'account': {'id': 19958, '_links': {'self': {'href': '/v1/account/19958'}}},
        'store': [{
            'id': 307,
            'name': 'Store 1',
            'country': 'fr',
            'permission': {
                'ads': '*',
                'affiliation': '*',
                'buyline': '*',
                'facturation': '*',
                'marketplaces': '*',
                'multiple': '*',
                'owner': '*',
                'retargeting': '*',
                'shopbots': '*',
                'solomo': '*',
                'statistics': '*',
                'timeline': '*',
                'tools': '*'
            },
            'status': 'active',
            'timeline': {'total': 0},
            '_links': {'self': {'href': '/v1/store/307'}},
            'feed': {
                'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                'source': 'Prestashop'
            },
            '_embedded': {
                'order': {
                    'newCount': 12
                }
            }
        },
            {
                'id': 308,
                'name': 'Store 2',
                'permission': {
                    'university': '*'
                },
                'status': 'deleted',
                '_embedded': {
                    'order': {
                        'newCount': 0
                    }
                },
                'timeline': {'total': 12},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
            },
            {
                'id': 309,
                'name': 'Store 3',
                'permission': {
                    'solomo': '*',
                    'statistics': '*',
                    'timeline': '*',
                    'tools': '*'
                },
                'status': 'suspended',
                '_embedded': {
                    'order': {
                        'newCount': 0
                    }
                },
                'timeline': {'total': 22},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
            }
        ]
    }
};