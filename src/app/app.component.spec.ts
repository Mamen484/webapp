import { AppComponent } from './app.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SflAuthService, SflLocaleIdService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router = <any>{};
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(async(() => {
        router.events = new Subject();
        authService = jasmine.createSpyObj('SflAuthService spy', ['removeTokenFromUrl']);
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: Router, useValue: router},
                {provide: SflAuthService, useValue: authService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
