export class CreateMerchantModel  {
    owner: {
        email: string,
        login: string,
        password: string
    };
    feed: {
        url: string,
        source: string,
        settings: {
            xmlProductNode: string
        }
    };
    country: string;
}