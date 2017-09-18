import { toPairs } from 'lodash';

export class Helpers {
    static createQueryString(object: { [key: string]: any }) {
        return toPairs(object)
            .map(([paramName, paramValue]) => paramName + '=' + paramValue).join('&');
    }
}
