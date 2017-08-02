import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(protected httpClient: HttpClient) {
    }

    public fetchAggregatedInfo() {
        return <Observable<AggregatedUserInfo>>(this.httpClient.get(`${environment.API_URL}/me`));
    }

}

