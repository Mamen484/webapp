import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleCallIframeComponent } from './schedule-call-iframe.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SupportService } from '../core/services/support.service';

describe('ScheduleCallIframeComponent', () => {
    let fixture: ComponentFixture<ScheduleCallIframeComponent>;
    let supportService: SupportService;
    let sanitizer: jasmine.SpyObj<DomSanitizer>;
    beforeEach(async(() => {
        supportService = <any>{};
        sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
        sanitizer.bypassSecurityTrustResourceUrl.and.callFake(value => value);
        TestBed.configureTestingModule({
            declarations: [
                ScheduleCallIframeComponent
            ],
            providers: [
                {
                    provide: SupportService,
                    useValue: supportService
                },
            ]
        })
            .compileComponents();
    }));

    it('should set a proper iframe source for a french locale', () => {
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.debugElement.injector.get(SupportService).helpCenterLanguage = 'fr_fr';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedfr/feedangel-fr');
    });

    it('should set a proper iframe source for a spanish locale', () => {
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.debugElement.injector.get(SupportService).helpCenterLanguage = 'es';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedes/onboarding-es');
    });

    it('should set a proper iframe source for an italian locale', () => {
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.debugElement.injector.get(SupportService).helpCenterLanguage = 'it';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedit/onboarding-it');
    });

    it('should set a proper iframe source for an english locale', () => {
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.debugElement.injector.get(SupportService).helpCenterLanguage = 'en';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedus/onboarding-us');
    });
});
