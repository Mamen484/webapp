import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsListComponent } from './channels-list.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { EMPTY, of } from 'rxjs';

describe('ChannelsListComponent', () => {
    let component: ChannelsListComponent;
    let fixture: ComponentFixture<ChannelsListComponent>;
    let store: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async () => {
        store = jasmine.createSpyObj(['select']);
        await TestBed.configureTestingModule({
            declarations: [ChannelsListComponent],
            providers: [{provide: Store, useValue: store}],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelsListComponent);
        component = fixture.componentInstance;
        store.select.and.returnValue(EMPTY);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign currentRoute', () => {
        store.select.and.returnValue(of({pageName: 'some-page'}));
        fixture.detectChanges();
        expect(component.currentRoute).toBe('some-page');
    });
});
