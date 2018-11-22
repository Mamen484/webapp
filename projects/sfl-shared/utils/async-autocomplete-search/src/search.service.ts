import { Observable } from 'rxjs';

export abstract class SflSearchService<T> {
    abstract getResults: (searchQuery: string) => Observable<T[]>;
}