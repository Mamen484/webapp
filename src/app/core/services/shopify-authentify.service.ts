import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CreateStoreModel } from '../entities/create-store-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ShopifyAuthentifyService {
    protected apiUrl = environment.API_URL;
    protected storeData: CreateStoreModel;

    constructor(protected httpClient: HttpClient) {
    }

    public getAuthorizationUrl(shop: string): Observable<string> {

        return this.httpClient.get(this.apiUrl + '/shopify/auth/' + this.getShopName(shop))
            .map((data: { authorizeUrl: string }) => data.authorizeUrl);
    }

    public getStoreData(shop: string, {code, timestamp, hmac}: Params): Observable<CreateStoreModel> {

        if (!this.storeData) {
            return this.httpClient.get(this.apiUrl + '/shopify/store/' + this.getShopName(shop), {
                params: new HttpParams()
                    .set('code', code)
                    .set('timestamp', timestamp)
                    .set('hmac', hmac)
            })
                .map((data: any) => CreateStoreModel.createFromResponse(data, this.getShopName(shop)))
                .do(data => this.storeData = data);
        }
        return Observable.of(this.storeData);

    }

    public updateStore(store: CreateStoreModel) {

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
