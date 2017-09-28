import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

export class TableDataSource extends DataSource<any> {
    constructor(protected dataSource) {
        super();
    }

    connect(): Observable<any[]> {
        return this.dataSource;
    }

    disconnect(): void {
    }
}
