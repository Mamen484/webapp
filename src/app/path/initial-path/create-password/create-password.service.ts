import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
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
      return this.http.post(this.apiUrl+'/merchant', merchant)
        .map((response: Response) => {return {success: response.status === 201}});
    }
}
