import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from 'sfl-shared/entities';

@Injectable()
export class ShopifyAuthentifyService {
    protected apiUrl = environment.API_URL;
    protected storeData: Store;

    constructor(protected httpClient: HttpClient) {
    }

    public getAuthorizationUrl(shop: string): Observable<string> {
        return this.httpClient.get(this.apiUrl + '/shopify/auth/' + this.getShopName(shop))
            .pipe(map((data: { authorizeUrl: string }) => data.authorizeUrl));
    }

    public getStoreData(shop: string, {code, timestamp, hmac}: Params): Observable<Store> {
        if (!this.storeData) {
            return this.httpClient.get(this.apiUrl + '/shopify/store/' + this.getShopName(shop), {
                params: new HttpParams()
                    .set('code', code)
                    .set('timestamp', timestamp)
                    .set('hmac', hmac)
            })
                .pipe(map((data: any) => Store.createFromResponse(data, this.getShopName(shop))))
                .pipe(tap(data => this.storeData = data));
        }
        return of(this.storeData);

    }

    public updateStore(store: Store) {

        let data = [{
            op: 'replace',
            path: '/owner/token',
            value: store.owner.token
        }];

        return this.httpClient.patch(this.apiUrl + '/store/' + store.storeId, data);
    }

    protected getShopName(shop) {
        return shop.split('.myshopify.com')[0];
    }
}
