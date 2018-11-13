import { ServerException } from './server-exception';

export interface StoreError {
    detail: string;
    exception: ServerException;
    status: number; // HTTP status
    type: string; // Link to the response type definition
    validationMessages: any;
}
