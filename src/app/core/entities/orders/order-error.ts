export interface OrderError {
    type: 'import' | 'ship';
    message: string;
    occuredAt: string;
}
