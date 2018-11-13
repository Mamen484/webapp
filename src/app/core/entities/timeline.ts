import { PagedResponse } from 'sfl-shared/entities';

export interface Timeline<T> extends PagedResponse<{timeline: T[]}> {
}
