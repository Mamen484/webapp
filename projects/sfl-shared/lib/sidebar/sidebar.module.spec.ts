import { SflSidebarModule } from './sidebar.module';

describe('SidebarModule', () => {
  let sflSidebarModule: SflSidebarModule;

  beforeEach(() => {
    sflSidebarModule = new SflSidebarModule();
  });

  it('should create an instance', () => {
    expect(sflSidebarModule).toBeTruthy();
  });
});
