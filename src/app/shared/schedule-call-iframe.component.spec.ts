import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleCallIframeComponent } from './schedule-call-iframe.component';
import { LocaleIdService } from '../core/services/locale-id.service';
import { DomSanitizer } from '@angular/platform-browser';

describe('ScheduleCallIframeComponent', () => {
    let fixture: ComponentFixture<ScheduleCallIframeComponent>
    let localeIdService: jasmine.SpyObj<LocaleIdService>;
    let sanitizer: jasmine.SpyObj<DomSanitizer>;
    beforeEach(async(() => {
        localeIdService = jasmine.createSpyObj('LocaleIdService', ['getHelpCenterLanguage']);
        sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
        sanitizer.bypassSecurityTrustResourceUrl.and.callFake(value => value);
        TestBed.configureTestingModule({
            declarations: [
             ScheduleCallIframeComponent
            ],
            providers: [
                {
                    provide: LocaleIdService,
                    useValue: localeIdService
                },
            ]
        })
            .compileComponents();
    }));

    it('should set a proper iframe source for a french locale', () => {
        localeIdService.getHelpCenterLanguage.and.returnValue('fr_fr');
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedfr/feedangel-fr');
    });

    it('should set a proper iframe source for a spanish locale', () => {
        localeIdService.getHelpCenterLanguage.and.returnValue('es');
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedes/onboarding-es');
    });

    it('should set a proper iframe source for an italian locale', () => {
        localeIdService.getHelpCenterLanguage.and.returnValue('it');
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedit/onboarding-it');
    });

    it('should set a proper iframe source for an english locale', () => {
        localeIdService.getHelpCenterLanguage.and.returnValue('en');
        fixture = TestBed.createComponent(ScheduleCallIframeComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('iframe').getAttribute('src'))
            .toEqual('https://calendly.com/shoppingfeedus/onboarding-us');
    });
});
