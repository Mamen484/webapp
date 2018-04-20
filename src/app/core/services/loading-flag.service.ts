import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingFlagService {

    loading$ = new BehaviorSubject<boolean>(false);

    isLoading() {
        return this.loading$.asObservable();
    }

    triggerLoadingStarted() {
        this.loading$.next(true);
    }

    triggerLoadedFinished() {
        this.loading$.next(false);
    }

}
