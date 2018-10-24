import { values } from 'lodash';

export class ServerValidationError {
    constructor(validationObj) {
        for (let key in validationObj) {
            if (validationObj.hasOwnProperty(key)) {
                this[key] = values(validationObj[key])[0];
            }
        }
    }
}
