import { Injectable } from '@angular/core';
import { AutotagService } from '../shared/autotag-mapping/autotag-service';
import { FeedService } from '../../core/services/feed.service';
import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { Autotag } from '../autotag';

@Injectable()
export class CategoryAutotagService implements AutotagService {

    constructor(private feedService: FeedService) {
    }

    fetchAutotagList(feedId, catalogItemId, params: { requirement?: 'required' | 'optional'; matching?: 'matched' | 'empty'; page?: number }): Observable<PagedResponse<{ autotag: Autotag[] }>> {
        return this.feedService.fetchAutotagByCategory(feedId, catalogItemId, params);
    }

    matchAutotag(feedId, catalogItemId, channelAttributeId, value) {
        return this.feedService.matchAutotagByCategory(feedId, catalogItemId, channelAttributeId, value);
    }
}
