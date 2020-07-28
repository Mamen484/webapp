import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { Autotag } from '../../autotag';

export abstract class AutotagService {
    abstract fetchAutotagList(
        feedId,
        catalogItemId, // category or product id
        params: { requirement?: 'required' | 'optional', matching?: 'matched' | 'empty', page?: number }
    ): Observable<PagedResponse<{ autotag: Autotag[] }>>;

    abstract matchAutotag(feedId, catalogItemId, channelAttributeId, value);
}
