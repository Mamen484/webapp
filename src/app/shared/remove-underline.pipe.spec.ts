import { RemoveUnderlinePipe } from './remove-underline.pipe';

describe('RemoveUnderlinePipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveUnderlinePipe();
    expect(pipe).toBeTruthy();
  });

    it('should replace underlines with spaces', () => {
        const pipe = new RemoveUnderlinePipe();
        expect(pipe.transform('waiting_store_acceptance')).toEqual('waiting store acceptance');
    });
});
