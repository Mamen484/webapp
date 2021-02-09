import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContainerComponent } from './login-container.component';
import { SflLocaleIdService } from 'sfl-shared/services';

describe('LoginContainerComponent', () => {
    let component: LoginContainerComponent;
    let fixture: ComponentFixture<LoginContainerComponent>;
    let localeIdService: SflLocaleIdService;

    beforeEach(async(() => {
        localeIdService = <any>{localeId: 'en'};
        TestBed.configureTestingModule({
            declarations: [LoginContainerComponent],
            providers: [{provide: SflLocaleIdService, useValue: localeIdService}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign a baseHref', () => {
        expect(component.baseHref).toBe('/v3/en');
    });
});
