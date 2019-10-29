import { CustomParamsEncoder } from './custom-params-encoder';

describe('CustomParamsEncoder', () => {
    it('should encode key', () => {
        const encoder = new CustomParamsEncoder();
        expect(encoder.encodeKey('<test param="some_v-a~lue>')).toBe('%3Ctest%20param%3D%22some_v-a~lue%3E');
    });

    it('should encode value', () => {
        const encoder = new CustomParamsEncoder();
        expect(encoder.encodeValue('<test param="some_v-a~lue>')).toBe('%3Ctest%20param%3D%22some_v-a~lue%3E');
    });

    it('should decode key', () => {
        const encoder = new CustomParamsEncoder();
        expect(encoder.decodeKey('%3Ctest%20param%3D%22some_v-a~lue%3E')).toBe('<test param="some_v-a~lue>');
    });

    it('should decode value', () => {
        const encoder = new CustomParamsEncoder();
        expect(encoder.decodeValue('%3Ctest%20param%3D%22some_v-a~lue%3E')).toBe('<test param="some_v-a~lue>');
    });
});
