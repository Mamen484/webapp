import { Component, Input } from '@angular/core';
import { Channel } from '../../core/entities/channel';
import { environment } from '../../../environments/environment';
import { MdDialog } from '@angular/material';
import { ConnectIntlChannelDialogComponent } from '../connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { InternationalAccountService } from '../../core/services/international-account.service';
import { IntlRequestSuccessDialogComponent } from '../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../request-failed-dialog/request-failed-dialog.component';
import { StoreChannel } from '../../core/entities/store-channel';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { WindowRefService } from '../../core/services/window-ref.service';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';

@Component({
    selector: 'sf-suggested-channel',
    templateUrl: './suggested-channel.component.html',
    styleUrls: ['./suggested-channel.component.scss']
})
export class SuggestedChannelComponent {

    @Input() channel: StoreChannel;
    @Input() internationalMode = false;

    constructor(
        protected dialog: MdDialog,
        protected internationalAccountService: InternationalAccountService,
        protected legacyLinkService: LegacyLinkService,
        protected windowRef: WindowRefService,
        protected appStore: Store<AppState>) {
    }

    showInternationalChannelDialog() {
        let dialogRef = this.dialog.open(ConnectIntlChannelDialogComponent);
        dialogRef.afterClosed().subscribe((agree: boolean) => {
            if (!agree) {
                return;
            }
            this.internationalAccountService.sendInternationalAccountRequest().subscribe(
                () => this.dialog.open(IntlRequestSuccessDialogComponent),
                () => this.dialog.open(RequestFailedDialogComponent)
            );
        });
    }

    goToLegacy(path) {
        this.appStore.select('currentStore').take(1).subscribe(currentStore =>
            this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(path)
        );
    }
}
