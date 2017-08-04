import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import {CreateStoreModel} from "../../path/initial-path/create-password/create-store.model";
import {Params} from "@angular/router";
import "rxjs/add/operator/map";
import {environment} from "../../../environments/environment";

@Injectable()
export class ShopifyAuthentifyService {
    private apiUrl = environment.API_URL;

    constructor(
        private http: Http,
    ) {}

    public getAuthorizationUrl(shop: string): Observable<string> {
        let name = shop.split('.myshopify.com')[0];

        return this.http.get(this.apiUrl+'/shopify/auth/'+name, {headers: this.getHeaders()})
            .map((response: Response ) => response.json())
            .map((data: {authorizeUrl: string}) => data.authorizeUrl);
    }

    public getStoreData(shop: string, query: Params): Observable<CreateStoreModel> {
        let name: string = shop.split('.myshopify.com')[0];
        let queryString: string =
            '?code='+(query['code'])+
            '&timestamp='+(query['timestamp'])+
            '&hmac='+(query['hmac']);

        return this.http.get(this.apiUrl+'/shopify/store/'+name+queryString, {headers: this.getHeaders()})
            .map((response: Response) => response.json())
            .map((data: any) => { return {
                store: {
                    id: data.id,
                    owner: {
                        email: data.email,
                        login: name,
                        password: '',
                        token: '',
                    },
                    feed: {
                        url: data.feed,
                        source: 'shopify',
                        mapping: {
                            'category': 'category',
                            'brand': 'brand',
                            'brand-link': 'brand-link',
                            'reference': 'id',
                            'name': 'name',
                            'link': 'uri',
                            'description': 'description',
                            'short_description': 'short_description',
                            'price': 'price',
                            'old_price': 'old-price',
                            'shipping_cost': 'shipping-cost',
                            'shipping_time': 'shipping-time',
                            'quantity': 'quantity',
                            'ean': 'barcode',
                            'weight': 'weight',
                            'ecotax': 'ecotax',
                            'tva': 'vat'
                        },
                        settings: {
                            xmlProductNode: 'product'
                        }
                    },
                    country: data.language,
                }
            }})
        ;
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', environment.DEFAULT_AUTHORIZATION);

        return headers;
    }

    public updateStore(store: CreateStoreModel){

        let data = {
            op: 'replace',
            path: 'owner/token',
            value: store.store.owner.token
        };

        this.http.patch(this.apiUrl+'/store/'+store.store.id, data, {headers: this.getHeaders()})
            .subscribe();
    }
}