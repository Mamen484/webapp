import { Link } from 'sfl-shared/src/lib/core/entities';

export interface Links {
    self: Link;
    first?: Link;
    last?: Link;
    previous?: Link | null;
    next?: Link | null;
}
