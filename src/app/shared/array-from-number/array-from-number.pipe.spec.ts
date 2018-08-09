import { ArrayFromNumberPipe } from './array-from-number.pipe';

describe('ArrayFromNumberPipe', () => {
    it('create an instance', () => {
        const pipe = new ArrayFromNumberPipe();
        expect(pipe).toBeTruthy();
    });

    it('create an array from a number', () => {
        const pipe = new ArrayFromNumberPipe();
        expect(pipe.transform(5)).toEqual([1, 2, 3, 4, 5])
    });
});
