import { ChangeDetectorRef, Component } from '@angular/core';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { Observable } from 'rxjs';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { map } from 'rxjs/operators';
import { Channel, ChannelState } from 'sfl-shared/entities';
import { MatTableDataSource } from '@angular/material';
import { ChannelOperatorsAppLinkService } from '../channel-operators-app-link.service';

@Component({
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent extends TableOperations<Channel> {
    displayedColumns = ['channelName', 'accountName', 'lastChanged', 'active'];

    constructor(protected windowRef: SflWindowRefService,
                protected channelService: ChannelService,
                protected changeDetectorRef: ChangeDetectorRef,
                protected channelSettingsLink: ChannelOperatorsAppLinkService) {
        super();
    }

    changeState(element: Channel, event) {
        event.stopPropagation();
        if (element.state === ChannelState.inactive) {
            this.channelService.activate(element.id).subscribe(
                () => this.changeElementState(element, ChannelState.active),
                () => this.changeElementState(element, ChannelState.inactive),
            );
        } else {
            this.channelService.deactivate(element.id).subscribe(
                () => this.changeElementState(element, ChannelState.inactive),
                () => this.changeElementState(element, ChannelState.active),
            );
        }
    }

    goToChannel(channelId) {
        this.channelSettingsLink.getLink('/', new URLSearchParams({channelId})).subscribe(link => {
            this.windowRef.nativeWindow.open(link);
        });
    }

    protected changeElementState(element: Channel, state: ChannelState) {
        const items = this.dataSource.data;
        element.state = state;
        items[items.findIndex(item => item.id === element.id)] = Object.assign({}, element);
        this.dataSource = new MatTableDataSource<Channel>(items);
    }

    protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: Channel[] }> {
        return this.channelService.listChannels(
            Object.assign({}, params, {
                permission: 'edit',
                state: 'active,inactive',
            })
        ).pipe(
            map(channelsList => ({total: channelsList.total, dataList: channelsList._embedded.channel}))
        );
    }
}
