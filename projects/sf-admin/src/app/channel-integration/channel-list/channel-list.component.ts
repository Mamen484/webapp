import { Component } from '@angular/core';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { Observable, of } from 'rxjs';
import { ChannelPermission } from '../channel-permission';
import { channelsList } from '../channel-list.mock';

@Component({
    templateUrl: './channel-list.component.html',
    styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent extends TableOperations<ChannelPermission> {
    displayedColumns = ['channelName', 'accountName', 'lastChanged', 'active'];

    protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: any[] }> {
        return of({total: channelsList.total, dataList: channelsList._embedded.permission});
    }
}
