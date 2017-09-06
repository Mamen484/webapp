import { CreateStoreFeed } from './create-store-feed';

export class CreateStoreModel {
    storeId = 0;
    owner = {
        email: '',
        login: '',
        password: '',
        token: '',
    };
    feed = new CreateStoreFeed();
    country = '';

    static createForRegistration(email, password){
        let store = new CreateStoreModel();
        store.owner.email = email;
        store.owner.password = password;
        return store;
    }
}
