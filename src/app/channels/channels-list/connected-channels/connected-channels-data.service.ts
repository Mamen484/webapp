import { Injectable } from '@angular/core';
import { StoreService } from 'sfl-shared/services';
import { map } from 'rxjs/operators';
import { PagedResponse, StoreChannel } from 'sfl-shared/entities';

@Injectable({
    providedIn: 'root'
})
export class ConnectedChannelsDataService {

    constructor(private storeService: StoreService) {
    }

    getStatistics() {
        return this.storeService.fetchStatistics().pipe(map(statistics => ({
            statistics: statistics._embedded
                ? statistics._embedded.channel.reduce(
                    (acc, current) => Object.assign(acc, {[current.id]: current}), {})
                : {},
            currency: statistics.currency
        })));
    }

    getChannels(filter) {
        return this.storeService.getInstalledChannels(filter)
            .pipe(map((response: PagedResponse<{ storeChannel: StoreChannel[] }>) => ({
                channels: response._embedded.storeChannel,
                page: response.page,
                pages: response.pages,
            })));
    }
}
