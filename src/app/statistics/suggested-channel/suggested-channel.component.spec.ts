import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdCardModule, MdDialog } from '@angular/material';

import { SuggestedChannelComponent } from './suggested-channel.component';
import { InternationalAccountService } from '../../core/services/international-account.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs/Observable';
import { IntlRequestSuccessDialogComponent } from '../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../request-failed-dialog/request-failed-dialog.component';


describe('SuggestedChannelComponent', () => {
    let component: SuggestedChannelComponent;
    let fixture: ComponentFixture<SuggestedChannelComponent>;
    let afterClosedSpy;
    let requestSpy;
    let openSpy;

    beforeEach(async(() => {
        afterClosedSpy = jasmine.createSpy('afterClosed');
        requestSpy = jasmine.createSpy('sendInternationalAccountRequestSpy');
        openSpy = jasmine.createSpy('dialog.open');
        openSpy.and.returnValue({afterClosed: afterClosedSpy});

        TestBed.configureTestingModule({
            imports: [MdCardModule, MdButtonModule, InfiniteScrollModule],
            declarations: [SuggestedChannelComponent],
            providers: [
                {provide: MdDialog, useValue: {open: openSpy}},
                {
                    provide: InternationalAccountService,
                    useValue: {sendInternationalAccountRequest: requestSpy}
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestedChannelComponent);
        component = fixture.componentInstance;
        component.channel = <any>{_links: {image: {href: ''}}, name: ''};
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should not send international account request when user did not agree for that', () => {
        afterClosedSpy.and.returnValue(Observable.of(false));
        component.showInternationalChannelDialog();
        expect(requestSpy).not.toHaveBeenCalled();
    });

    it('should send international account request when user agreed for that', () => {
        afterClosedSpy.and.returnValue(Observable.of(true));
        requestSpy.and.returnValue(Observable.of({}))
        component.showInternationalChannelDialog();
        expect(requestSpy).toHaveBeenCalled();
    });

    it('should open success dialog when the server returned success', () => {
        afterClosedSpy.and.returnValue(Observable.of(true));
        requestSpy.and.returnValue(Observable.of({}));
        component.showInternationalChannelDialog();
        expect(openSpy).toHaveBeenCalledWith(IntlRequestSuccessDialogComponent);
    });

    it('should open fail dialog when the server returned an error', () => {
        afterClosedSpy.and.returnValue(Observable.of(true));
        requestSpy.and.returnValue(Observable.throw({}));
        component.showInternationalChannelDialog();
        expect(openSpy).toHaveBeenCalledWith(RequestFailedDialogComponent);
    })
});
