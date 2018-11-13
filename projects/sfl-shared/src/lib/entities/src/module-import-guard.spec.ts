import { ModuleImportGuard } from './module-import-guard';

describe('ModuleImportGuard', () => {
    it ('should throw an error if a module is already loaded', () => {
        expect(() => ModuleImportGuard.throwIfAlreadyLoaded('someParent', 'someModule'))
            .toThrowError('someModule has already been loaded. Import Core modules in the AppModule only.')
    });
});
