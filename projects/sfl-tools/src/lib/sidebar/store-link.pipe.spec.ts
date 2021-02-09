import { StoreLinkPipe } from './store-link.pipe';
import { EMPTY, from, of } from 'rxjs';
import { NavigationEnd, NavigationStart } from '@angular/router';
import { SflUserService } from 'sfl-shared/services';

describe('StoreLinkPipe', () => {

    it('add to the current url store and id', async () => {
        const pipe = new StoreLinkPipe(
            {
                nativeWindow: {
                    location: {
                        search: '?someprop=someValue',
                        origin: 'https://app.shopping-feed.com',
                        pathname: '/tools/settings',
                        hash: '#somehash'
                    }
                }
            },
            <any>{fetchAggregatedInfo: () => of({token: 'someToken'})},
            <any>undefined,
        );
        expect(await pipe.transform(125).toPromise()).toBe('https://app.shopping-feed.com/tools/settings?someprop=someValue&store=125&token=someToken#somehash');
    });

    it('filter events', async () => {
        const userService: jasmine.SpyObj<SflUserService> = jasmine.createSpyObj(['fetchAggregatedInfo']);
        userService.fetchAggregatedInfo.and.returnValue(EMPTY);
        const pipe = new StoreLinkPipe(
            {
                nativeWindow: {
                    location: {
                        search: '?someprop=someValue',
                        origin: 'https://app.shopping-feed.com',
                        pathname: '/tools/settings',
                        hash: '#somehash'
                    }
                }
            },
            <any>userService,
            <any>{events: from([new NavigationStart(1, ''), new NavigationEnd(2, '', '')])},
        );
        pipe.transform(125).subscribe();
        expect(userService.fetchAggregatedInfo).toHaveBeenCalledTimes(2);

    });
});
