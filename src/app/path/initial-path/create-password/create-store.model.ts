export class CreateStoreModel  {
    store: {
        storeId: number,
        owner: {
            email: string,
            login: string,
            token: string,
            password: string
        };
        feed: {
            url: string,
            source: string,
            mapping: object,
            settings: {
                xmlProductNode: string
            }
        };
        country: string;
    }

    constructor() {
        this.store = {
            storeId: 0,
            owner: {
                email: '',
                login: '',
                password: '',
                token: '',
            },
            feed: {
                url: '',
                source: '',
                mapping: {},
                settings: {
                    xmlProductNode: ''
                }
            },
            country: '',
        };
    }
}