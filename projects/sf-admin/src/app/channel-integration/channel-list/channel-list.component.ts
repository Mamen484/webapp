import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { map } from 'rxjs/operators';
import { Channel, ChannelState } from 'sfl-shared/entities';
import { MatTableDataSource } from '@angular/material';
import { ChannelOperatorsAppLinkService } from '../channel-operators-app-link.service';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { ChannelsPermission } from './filters-dialog/channels-permission.enum';
import { Filter } from './filters-dialog/filter';
import {TableOperations} from 'sfl-tools/src/lib/table-operations';

@Component({
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent extends TableOperations<Channel> {
    displayedColumns = ['channelName', 'accountName', 'lastChanged', 'active'];
    filter = new Filter();

    constructor(protected windowRef: SflWindowRefService,
                protected channelService: ChannelService,
                protected changeDetectorRef: ChangeDetectorRef,
                protected channelSettingsLink: ChannelOperatorsAppLinkService,
                protected matDialog: MatDialog) {
        super();
    }

    cancelFilter() {
        this.filter.permission = ChannelsPermission.all;
        this.isLoadingResults = true;
        this.fetchData();
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

    openFilters() {
        this.matDialog.open(FiltersDialogComponent, {data: this.filter}).afterClosed().subscribe(filter => {
            if (filter) {
                this.filter = filter;
                this.isLoadingResults = true;
                this.fetchData();
            }
        })
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
                permission: this.filter.permission,
                state: 'active,inactive',
            })
        ).pipe(
            map(channelsList => ({total: channelsList.total, dataList: channelsList._embedded.channel}))
        );
    }
}
