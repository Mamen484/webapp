import { Link } from './link';

export interface Rule {
    _links: {
        self: Link
    },
    id: number,
    name: string;
}
