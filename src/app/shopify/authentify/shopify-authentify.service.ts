import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Config } from "../../core/core.config";
import {CreateMerchantModel} from "../../path/initial-path/create-password/create-merchant.model";
import {Params} from "@angular/router";
import "rxjs/add/operator/map";
import {escape} from "querystring";

@Injectable()
export class ShopifyAuthentifyService {
    private apiUrl = Config.API_URL;

    constructor(
        private http: Http,
    ) {}

    public getAuthorizationUrl(shop: string): Observable<string> {
        let name = shop.split('.myshopify.com')[0];

        return this.http.get(this.apiUrl+'/shopify/auth/'+name, {headers: this.getHeaders()})
            .map((response: Response ) => response.json())
            .map((data: {authorize_url: string}) => data.authorize_url);
    }

    public getMerchantData(shop: string, query: Params): Observable<CreateMerchantModel> {
        let name: string = shop.split('.myshopify.com')[0];
        let queryString: string =
            '?code='+(query['code'])+
            '&timestamp='+(query['timestamp'])+
            '&hmac='+(query['hmac']);

        return this.http.get(this.apiUrl+'/shopify/merchant/'+name+queryString, {headers: this.getHeaders()})
            .map((response: Response) => response.json())
            .map((data: any) => { return {
                login: name,
                password: '',
                token: data.token,
                email: data.email,
                feed: data.feed,
                feed_type: 'shopify',
                language: data.language,
            }})
        ;
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', Config.DEFAULT_AUTHORIZATION);

        return headers;
    }
}