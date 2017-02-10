import {Observable} from "rxjs";

export class CreatePasswordServiceMock {
    public createPassword(email, password): Observable<{success: boolean}> {
        return Observable.of({success: email == 'foo@bar.baz' && password == '123456'});
    }
}