import { PagedResponse } from './paged-response';

export interface Timeline<T> extends PagedResponse<{timeline: T[]}> {
}
