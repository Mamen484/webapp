import { Link } from './link';

export interface Order {
    _links: {
        self: Link
    },
    reference: number
}
