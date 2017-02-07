import {Observable} from "rxjs";

export class CreatePasswordServiceMock {
    public createPassword(email, password): Observable<{success: boolean}> {
        console.log(email, password);
        return Observable.of({success: email == 'foo@bar.baz' && password == '123456'});
    }
}