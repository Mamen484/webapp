import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Config } from "../../core/core.config";
import "rxjs/add/operator/map";

@Injectable()
export class ShopifyAuthentifyService {
    private apiUrl = Config.API_URL;

    constructor(
        private http: Http
    ) {}

    public getAuthorizationUrl(shop): Observable<string> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer shopping-feed');

        return this.http.get(this.apiUrl+'/shopify/auth/'+shop, headers)
            .map((response: Response ) => response.json())
            .map((data: {authorize_url: string}) => data.authorize_url);
    }
}