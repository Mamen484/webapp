import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Config } from "../../../core/core.config";
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

    public createPassword(email, password): Observable<{success: boolean}> {
      return this.http.post(this.apiUrl+'/account/create-password', {email: email, password: password})
        .map((response: Response) => response.json())
        .map((data: any) => {return {success: !data.failed}});
    }
}
