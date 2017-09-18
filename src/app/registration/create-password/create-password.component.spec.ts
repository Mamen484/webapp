import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { Observable } from 'rxjs/Observable';
import { CreateStoreModel } from '../../core/entities/create-store-model';
import { WindowRefService } from '../../core/services/window-ref.service';
import { MenuModule } from '../../menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdInputModule } from '@angular/material';
import { CreatePasswordService } from './create-password.service';
import { LocaleIdService } from '../../core/services/locale-id.service';
import { ActivatedRoute } from '@angular/router';
import { LegacyLinkService } from '../../core/services/legacy-link.service';

describe('CreatePasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;
    let getItemSpy: jasmine.Spy;
    let setItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    let locationHrefSpy: jasmine.Spy;
    let queryParams;
    let window = {
        nativeWindow: {
            localStorage: {
                getItem: getItemSpy,
                    setItem: setItemSpy,
                    removeItem: removeItemSpy
            },
            location: {href: ''}
        }
    };

    beforeEach(async(() => {
        window.nativeWindow.localStorage.getItem = jasmine.createSpy('localStorage.getItem');
        window.nativeWindow.localStorage.setItem = jasmine.createSpy('localStorage.setItem');
        window.nativeWindow.localStorage.removeItem = jasmine.createSpy('localStorage.removeItem');
        // window.nativeWindow.location.href = '';
        queryParams = Observable.of({});



        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MenuModule, FormsModule, ReactiveFormsModule, MdInputModule, MdCardModule],
            providers: [
                {
                    provide: ShopifyAuthentifyService,
                    useValue: {getStoreData: () => Observable.of(new CreateStoreModel())}
                },
                {provide: WindowRefService, useValue: window},
                {provide: CreatePasswordService, useValue: {createPassword: () => Observable.of({})}},
                {provide: LocaleIdService, useValue: {localeId: 'en'}},
                {provide: ActivatedRoute, useValue: {queryParams: Observable.of({})}},
                {provide: LegacyLinkService, useValue: {getLegacyLink: () => {}}},
            ],
            declarations: [CreatePasswordComponent]
        })
            .compileComponents();
    }));

    describe('ngOnInit', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(CreatePasswordComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should be created', () => {
            expect(component).toBeTruthy();
        });

        it('should redirect to shopify app if not shop provided', () => {
            // expect(locationHrefSpy).toHaveBeenCalledWith(environment.SHOPIFY_APP_URL);

        });
    })


});
