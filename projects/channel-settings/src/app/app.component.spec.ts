import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SflAuthService} from 'sfl-shared/services';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

describe('AppComponent', () => {
    let authService: jasmine.SpyObj<SflAuthService>;
    let router = <any>{};
    beforeEach(async(() => {
        router.events = new Subject();
        authService = jasmine.createSpyObj('SflAuthService spy', ['removeTokenFromUrl']);
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [RouterTestingModule],
            providers: [
                {provide: Router, useValue: router},
                {provide: SflAuthService, useValue: authService},
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should remove a token from url on init', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        router.events.next(new NavigationEnd(1, '/', '/'));
        expect(authService.removeTokenFromUrl).toHaveBeenCalled();
    });

});
