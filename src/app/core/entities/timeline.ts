import { PagedResponse } from 'sfl-shared/src/lib/core/entities';

export interface Timeline<T> extends PagedResponse<{timeline: T[]}> {
}
