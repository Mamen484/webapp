import { Link } from 'sfl-shared/entities';

export interface Links {
    self: Link;
    first?: Link;
    last?: Link;
    previous?: Link | null;
    next?: Link | null;
}
