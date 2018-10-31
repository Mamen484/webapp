export interface ServerException {
    class: string;
    code: number;
    file: string;
    line: number;
    message: string;
    trace: any[];
}
