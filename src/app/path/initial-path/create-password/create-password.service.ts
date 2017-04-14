import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    private apiUrl = 'http://api.shopping-feed.lan/v1';

    constructor(
      private http: Http
    ) {}

    public createPassword(email, password): Observable<{success: boolean}> {
        return this.http.post(this.apiUrl+'/account/create-password', {email: email, password: password})
          .map((response: Response) => response.json())
        .map((data: any) => {return {success: !data.failed}});
    }

    public getAuthorizationUrl(shop): Observable<string> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer shopping-feed');

        return this.http.get(this.apiUrl+'/shopify/auth/'+shop, headers)
            .map((response: Response ) => response.json())
            .map((data: {authorize_url: string}) => data.authorize_url);
    }
}
