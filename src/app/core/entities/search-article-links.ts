import { Links } from './links';
import { Link } from 'sfl-shared/entities';

export interface SearchArticleLinks extends Links {
    topic: Link;
    translations: Link;
    attachments: {
        href: string,
        class: string,
        count: number
    };
    created_by: Link;
    updated_by: Link;
}
