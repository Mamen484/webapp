import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/operator/map";

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    private apiUrl = 'https://api.shopping-feed.com/account/create-password';

    constructor(
      private http: Http
    ) {}

    public createPassword(email, password): Observable<{success: boolean}> {
        return this.http.post(this.apiUrl, {email: email, password: password})
          .map((response: Response) => response.json());
    }
}