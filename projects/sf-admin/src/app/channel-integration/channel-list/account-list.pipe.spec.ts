import { AccountListPipe } from './account-list.pipe';

describe('AccountListPipe', () => {
    it('create an instance', () => {
        const pipe = new AccountListPipe();
        expect(pipe.transform([
            {_embedded: {account: {id: 3, name: 'Some account 3'}}},
            {_embedded: {account: {id: 4, name: 'Some account 4'}}},
        ])).toBe('Some account 3, Some account 4');
    });
});
