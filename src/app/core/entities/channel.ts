import { Link } from './link';

export interface Channel {
    id: number;
    name: string;
    description?: string;
    installed?: boolean;
    type?: string;
    segment?: string;
    offer?: string;
    countries?: any[],
    _links?: {
        self: Link
        image: Link
    }
}
