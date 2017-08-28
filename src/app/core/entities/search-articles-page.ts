import { Links } from './links';
import { SearchArticlesEntry } from './search-articles-entry';

export interface SearchArticlesPage {
    total_entries: number;
    page: number;
    _links: Links;
    _embedded: {
        entries: SearchArticlesEntry[]
    }
}
