import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Config } from "../../../core/core.config";
import { CreateMerchantModel } from "./create-merchant.model";
import "rxjs/add/operator/map";

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    private apiUrl = Config.API_URL;

    constructor(
      private http: Http
    ) {}

    public createPassword(merchant: CreateMerchantModel): Observable<{success: boolean}> {
      return this.http.post(this.apiUrl+'/merchant', merchant, {headers: this.getHeaders()})
        .map((response: Response) => {return {success: response.status < 300 && response.status >= 200}});
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', Config.DEFAULT_AUTHORIZATION);

        return headers;
    }
}
