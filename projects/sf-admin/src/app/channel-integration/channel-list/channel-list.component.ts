import { Component } from '@angular/core';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { Observable } from 'rxjs';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Channel } from 'sfl-shared/entities';

@Component({
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent extends TableOperations<Channel> {
    displayedColumns = ['channelName', 'accountName', 'lastChanged', 'active'];

    constructor(protected windowRef: SflWindowRefService, protected channelService: ChannelService) {
        super();
    }

    goToChannel(channelId) {
        this.windowRef.nativeWindow.open(`${environment.channelOperatorLink}/?channelId=${channelId}`);
    }

    protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: Channel[] }> {
        return this.channelService.listChannels(Object.assign({}, params, {permission: 'edit'})).pipe(
            map(channelsList => ({total: channelsList.total, dataList: channelsList._embedded.channel}))
        );
    }
}
