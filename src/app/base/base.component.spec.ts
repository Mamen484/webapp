import { BaseComponent } from './base.component';
import { SflLocaleIdService, StoreService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsService } from '../core/services/tags.service';
import { EMPTY } from 'rxjs';

describe('BaseComponent', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let storeService: jasmine.SpyObj<StoreService>;

    let tagsService: jasmine.SpyObj<TagsService>;

    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        store.select.and.returnValue(EMPTY);

        storeService = jasmine.createSpyObj('StoreService', ['getStoreChannels']);
        tagsService = jasmine.createSpyObj('TagsService', ['fetchAll']);

        TestBed.configureTestingModule({
            declarations: [BaseComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: store},
                {provide: StoreService, useValue: storeService},
                {provide: TagsService, useValue: tagsService},
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}}
            ]
        });

        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
