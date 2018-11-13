import { SflSharedModule } from './sfl-shared.module';

describe('SflSharedModule', () => {
    let coreModule: SflSharedModule;

    beforeEach(() => {
        coreModule = new SflSharedModule();
    });

    it('should create an instance', () => {
        expect(coreModule).toBeTruthy();
    });
});
