import { SfCurrencyPipe } from './sf-currency.pipe';

describe('SfCurrencyPipe', () => {

    let pipe;

    beforeEach(() => {
        pipe = new SfCurrencyPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('return a currency symbol before the number when the currency is USD', () => {
        expect(pipe.transform(34, '$')).toEqual('$34');
    });

    it('return a currency symbol after the number when the currency is EUR', () => {
        expect(pipe.transform(34, '€')).toEqual('34€');
    });
});
