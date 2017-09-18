import { Link } from './link';

export interface PagedResponse<T> {
    total?: number;
    limit?: number;
    pages?: number;
    page?: number;
    count?: number;
    _links: {
        self: Link
    },
    _embedded: T;
}
