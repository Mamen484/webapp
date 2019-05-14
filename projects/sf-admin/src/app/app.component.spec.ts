import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SflAuthService } from 'sfl-shared/services';

describe('AppComponent', () => {

    let router = <any>{};
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(async(() => {
        router.events = new Subject();
        authService = jasmine.createSpyObj('SflAuthService spy', ['removeTokenFromUrl']);
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Router, useValue: router},
                {provide: SflAuthService, useValue: authService},
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
