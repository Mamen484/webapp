import { CreatePasswordService } from './create-password.service';
import { CreateStoreModel } from '../entities/create-store-model';

describe('CreatePasswordService', () => {
    let httpClient;
    let service: CreatePasswordService;
    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post']);
        service = new CreatePasswordService(httpClient);
    });

    it('createPassword should send a proper request', () => {
        let store = new CreateStoreModel();
        service.createPassword(store);
        expect(httpClient.post.calls.mostRecent().args[0]).toEqual('http://api.shopping-feed.lan/v1/store');
        expect(httpClient.post.calls.mostRecent().args[1].store).toEqual(store);
    })
});
