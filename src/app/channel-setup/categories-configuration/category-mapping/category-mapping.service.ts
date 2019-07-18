import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../../core/entities/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryMappingService {

    protected mappingChanged$ = new Subject<Category>();

    constructor() {
    }

    notifyMappingChange(chosenCategory: Category) {
        this.mappingChanged$.next(chosenCategory);
    }

    getState() {
        return this.mappingChanged$.asObservable();
    }
}
