import { SflMenuModule } from './menu.module';

describe('MenuModule', () => {
    let menuModule: SflMenuModule;

    beforeEach(() => {
        menuModule = new SflMenuModule();
    });

    it('should create an instance', () => {
        expect(menuModule).toBeTruthy();
    });
});
