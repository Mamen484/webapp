import { Link } from 'sfl-shared/src/lib/core/entities';

export interface Rule {
    _links: {
        self: Link
    },
    id: number,
    name: string;
}
