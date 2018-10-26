import { ChannelBoxModule } from './channel-box.module';

describe('ChannelBoxModule', () => {
    let channelBoxModule: ChannelBoxModule;

    beforeEach(() => {
        channelBoxModule = new ChannelBoxModule();
    });

    it('should create an instance', () => {
        expect(channelBoxModule).toBeTruthy();
    });
});
