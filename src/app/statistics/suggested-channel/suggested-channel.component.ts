import { Component, Input } from '@angular/core';
import { Channel } from '../../core/entities/channel';
import { MatDialog } from '@angular/material';
import { ConnectIntlChannelDialogComponent } from '../connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { InternationalAccountService } from '../../core/services/international-account.service';
import { IntlRequestSuccessDialogComponent } from '../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../request-failed-dialog/request-failed-dialog.component';
import { StoreChannel } from '../../core/entities/store-channel';
import { AcceptChannelDialogComponent } from '../accept-channel-dialog/accept-channel-dialog.component';

@Component({
    selector: 'sf-suggested-channel',
    templateUrl: './suggested-channel.component.html',
    styleUrls: ['./suggested-channel.component.scss']
})
export class SuggestedChannelComponent {

    @Input() channel: StoreChannel;
    @Input() internationalMode = false;
    @Input() firstChannel = false;

    constructor(protected dialog: MatDialog,
                protected internationalAccountService: InternationalAccountService) {
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

    getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    openAcceptChannelDialog() {
        this.dialog.open(AcceptChannelDialogComponent, {
            data: {
                logo: this.channel._embedded.channel._links.image.href,
                link: this.getChannelLink(this.channel._embedded.channel),
            }
        });
    }

}
