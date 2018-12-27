import { Link } from 'sfl-shared/entities';

export interface Rule {
    _links: {
        self: Link
    },
    id: number,
    name: string;
}
