import { OrderErrorType } from './order-error-type.enum';

export interface OrderError {
    type: OrderErrorType;
    message: string;
    occuredAt: string;
}
