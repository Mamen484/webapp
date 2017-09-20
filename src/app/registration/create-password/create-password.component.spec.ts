import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { Observable } from 'rxjs/Observable';
import { CreateStoreModel } from '../../core/entities/create-store-model';
import { MenuModule } from '../../menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdInputModule } from '@angular/material';
import { CreatePasswordService } from './create-password.service';
import { LocaleIdService } from '../../core/services/locale-id.service';
import { ActivatedRoute } from '@angular/router';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

describe('CreatePasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;
    let getItemSpy: jasmine.Spy;
    let setItemSpy: jasmine.Spy;
    let queryParams;
    let localStorage = {getItem: getItemSpy, setItem: setItemSpy};

    beforeEach(async(() => {
        localStorage.getItem = jasmine.createSpy('localStorage.getItem');
        localStorage.setItem = jasmine.createSpy('localStorage.setItem');
        queryParams = Observable.of({});



        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MenuModule, FormsModule, ReactiveFormsModule, MdInputModule, MdCardModule],
            providers: [
                {
                    provide: ShopifyAuthentifyService,
                    useValue: {getStoreData: () => Observable.of(new CreateStoreModel())}
                },
                {provide: LocalStorageService, useValue: localStorage},
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
    })


});
