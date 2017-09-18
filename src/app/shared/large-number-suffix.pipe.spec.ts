import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';

describe('LargeNumberSuffixPipe', () => {

    let pipe;

    beforeEach(() => {
        pipe = new LargeNumberSuffixPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transform 1 to just 1', () => {
        expect(pipe.transform(1)).toEqual('1');
    });

    it('transform 1 to just 1 but return LargeNumberFormat object', () => {
        let formatted = pipe.transform(1, true);
        expect(formatted.number).toEqual('1');
        expect(formatted.suffix).toEqual('');
    });

    it('transform 1000 to 1K', () => {
        expect(pipe.transform(1000)).toEqual('1K');
    });

    it('transform 1000 to 1K but return LargeNumberFormat object', () => {
        let formatted = pipe.transform(1000, true);
        expect(formatted.number).toEqual('1');
        expect(formatted.suffix).toEqual('K');
    });

    it('transform 1000000 to 1M', () => {
        expect(pipe.transform(1000000)).toEqual('1M');
    });

    it('transform 1000000 to 1M but return LargeNumberFormat object', () => {
        let formatted = pipe.transform(1000000, true);
        expect(formatted.number).toEqual('1');
        expect(formatted.suffix).toEqual('M');
    });

    it('transform 244.24423312 to 244.24', () => {
        expect(pipe.transform(244.24423312)).toEqual('244.24');
    });

    it('transform 244.2 to 244.2', () => {
        expect(pipe.transform(244.2)).toEqual('244.2');
    });

    it('transform 2444.2 to 2.44K', () => {
        expect(pipe.transform(2444.2)).toEqual('2.44K');
    });

    it('transform 2400 to 2.4K', () => {
        expect(pipe.transform(2400)).toEqual('2.4K');
    });

    it('transform 2400000 to 2.4M', () => {
        expect(pipe.transform(2400000)).toEqual('2.4M');
    });

    it('transform 24414141 to 24.41M', () => {
        expect(pipe.transform(24414141)).toEqual('24.41M');
    });

});
