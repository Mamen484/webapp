import { SfNumberPipe } from './sf-number.pipe';

fdescribe('SfNumberPipe', () => {
    let pipe;

    beforeEach(() => {
        pipe = new SfNumberPipe('fr-FR');
    });
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format the number with spaces', () => {
        expect(pipe.transform(1)).toEqual('1');
        expect(pipe.transform(100)).toEqual('100');
        expect(pipe.transform(1000)).toEqual('1 000');
        expect(pipe.transform(2500)).toEqual('2 500');
        expect(pipe.transform(12530)).toEqual('12 530');
        expect(pipe.transform(143000)).toEqual('143 000');
        expect(pipe.transform(1430000)).toEqual('1 430 000');
        expect(pipe.transform(11430000)).toEqual('11 430 000');
    })
});
