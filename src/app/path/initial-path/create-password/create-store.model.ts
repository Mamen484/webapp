export class CreateStoreModel  {
    store: {
        owner: {
            email: string,
            login: string,
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
}