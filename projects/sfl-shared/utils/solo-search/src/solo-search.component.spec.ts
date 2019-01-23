import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SoloSearchComponent } from './solo-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SoloSearchComponent', () => {
    let component: SoloSearchComponent;
    let fixture: ComponentFixture<SoloSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SoloSearchComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SoloSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit searchQueryChanged event when a new search typed', fakeAsync(() => {
        let changed = '';
        component.searchQueryChanged.subscribe(value => changed = value);
        component.searchControl.setValue('some value');
        tick(500);
        expect(changed).toBe('some value');
    }));
});
