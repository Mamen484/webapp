export class CreateStoreModel  {
    store: {
        id: number,
        owner: {
            email: string,
            login: string,
            password: string,
            token: string
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
            id: 0,
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