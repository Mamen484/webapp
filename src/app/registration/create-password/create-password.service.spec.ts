import { CreatePasswordService } from './create-password.service';
import { Observable } from 'rxjs/Observable';
import { CreateStoreModel } from '../../core/entities/create-store-model';

describe('CreatePasswordService', () => {
    let service: CreatePasswordService;

    it('should return a success', done => {
        service = new CreatePasswordService(<any>{post: (url, data, config) => Observable.of({status: 200})});
        service.createPassword(new CreateStoreModel()).subscribe((data) => {
            expect(data.success).toEqual(true);
            done();
        });
    });

    it('should return false success', done => {
        service = new CreatePasswordService(<any>{post: (url, data, config) => Observable.of({status: 355})});
        service.createPassword(new CreateStoreModel()).subscribe((data) => {
            expect(data.success).toEqual(false);
            done();
        });
    });
});
