import { Link } from './link';

export interface Links {
    self: Link;
    first?: Link;
    last?: Link;
    previous?: Link | null;
    next?: Link | null;
}
