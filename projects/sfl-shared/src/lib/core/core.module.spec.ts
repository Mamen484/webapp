import { SflCoreModule } from './core.module';

describe('CoreModule', () => {
    let coreModule: SflCoreModule;

    beforeEach(() => {
        coreModule = new SflCoreModule();
    });

    it('should create an instance', () => {
        expect(coreModule).toBeTruthy();
    });
});
