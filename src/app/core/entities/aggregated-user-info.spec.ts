import { AggregatedUserInfo } from './aggregated-user-info';

describe('AggregatedUserInfo', () => {
    it('isAdmin should return true if a user has an "admin" role', () => {
        let userInfo = new AggregatedUserInfo();
        userInfo.roles = ['admin'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['user', 'admin'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['admin', 'user'];
        expect(userInfo.isAdmin()).toEqual(true);
    });

    it('isAdmin should return true if a user has an "employee" role', () => {
        let userInfo = new AggregatedUserInfo();
        userInfo.roles = ['employee'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['user', 'employee'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['employee', 'user'];
        expect(userInfo.isAdmin()).toEqual(true);
    });

    it('isAdmin should return true if a user has both "employee" and "admin" roles', () => {
        let userInfo = new AggregatedUserInfo();
        userInfo.roles = ['employee', 'admin'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['admin', 'employee'];
        expect(userInfo.isAdmin()).toEqual(true);

        userInfo.roles = ['employee', 'user', 'admin'];
        expect(userInfo.isAdmin()).toEqual(true);
    });

    it('isAdmin should return false if a user does not have "employee" or "admin" role', () => {
        let userInfo = new AggregatedUserInfo();
        userInfo.roles = ['user'];
        expect(userInfo.isAdmin()).toEqual(false);

        userInfo.roles = [];
        expect(userInfo.isAdmin()).toEqual(false);
    });

    it('should properly copy data to the userInfo instance on static create call', () => {
        let userInfo = AggregatedUserInfo.create({
            token: 'some token',
            login: 'some login',
            email: 'some email',
            roles: ['user', 'admin'],
            language: 'fr',
            _embedded: {
                account: {
                    id: 22,
                },
                store: [{
                    id: 34
                }]
            }
        });
        expect(userInfo.token).toEqual('some token');
        expect(userInfo.login).toEqual('some login');
        expect(userInfo.email).toEqual('some email');
        expect(userInfo.roles).toEqual(['user', 'admin']);
        expect(userInfo.language).toEqual('fr');
        expect(userInfo._embedded.account.id).toEqual(22);
        expect(userInfo._embedded.store[0].id).toEqual(34);
        expect(typeof userInfo.isAdmin).toEqual('function');
    });

    it('hasEnabledStore should return true is there is a store with a status different from "deleted"', () => {
        let userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 1},
            {status: 'active', id: 2},
        ]}});
        expect(userInfo.hasEnabledStore()).toEqual(true);
    });

    it('hasEnabledStore should return true is there is a store with a status different from "deleted" by specified name', () => {
        let userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 1, name: 'store1'},
            {status: 'active', id: 2, name: 'store2'},
        ]}});
        expect(userInfo.hasEnabledStore('store2')).toEqual(true);
    });

    it('hasEnabledStore should return false is there is NO store with a status different from "deleted"', () => {
        let userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 1},
            {status: 'deleted', id: 2},
        ]}});
        expect(userInfo.hasEnabledStore()).toEqual(false);
    });

    it('findFirstEnabledStore should return the first store with a status different from "deleted"', () => {
        let userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 1},
            {status: 'active', id: 2},
        ]}});
        expect(userInfo.findFirstEnabledStore().id).toEqual(2);

        userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 3},
            {status: 'demo', id: 4},
        ]}});
        expect(userInfo.findFirstEnabledStore().id).toEqual(4);

        userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 5},
            {status: 'suspended', id: 6},
        ]}});
        expect(userInfo.findFirstEnabledStore().id).toEqual(6);
    });

    it('findEnabledStore should return enabled store with specified name', () => {
        let userInfo = AggregatedUserInfo.create({_embedded: {store: [
            {status: 'deleted', id: 1, name: 'store1'},
            {status: 'active', id: 2, name: 'store2'},
        ]}});
        expect(userInfo.findEnabledStore('store2').id).toEqual(2);
    });

});
