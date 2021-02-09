import { Observable } from 'rxjs';

export interface UnsavedDataInterface {
    hasModifications: () => boolean;
    showCloseDialog: () => Observable<boolean>;
}
