import { Injectable } from '@angular/core';
import { AutotagService } from '../shared/autotag-mapping/autotag-service';
import { FeedService } from '../../core/services/feed.service';
import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { Autotag } from '../autotag';

@Injectable()
export class ProductAutotagService extends AutotagService {

    constructor(private feedService: FeedService) {
        super();
    }

    fetchAutotagList(
        feedId,
        catalogItemId,
        params: {
            requirement?: 'required' | 'optional';
            matching?: 'matched' | 'empty'; page?: number
        }): Observable<PagedResponse<{ autotag: Autotag[] }>> {
        return this.feedService.fetchAutotagByProduct(feedId, catalogItemId, params);
    }

    matchAutotag(feedId, catalogItemId, channelAttributeId, value) {
        return this.feedService.matchAutotagByProduct(feedId, catalogItemId, channelAttributeId, value);
    }


}
