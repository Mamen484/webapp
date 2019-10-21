import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreComponent } from './create-store.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateStoreComponent', () => {
    let component: CreateStoreComponent;
    let fixture: ComponentFixture<CreateStoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateStoreComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
