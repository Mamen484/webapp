import { ChannelLinkPipe } from './channel-link.pipe';

describe('ChannelLinkPipe', () => {
    it('create an instance', () => {
        const pipe = new ChannelLinkPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return a link to /{channelType}/manage/{channelName} page when the channel type is not marketplace', () => {
        const channel = <any>{type: 'some_type', name: 'some_name'};
        expect(ChannelLinkPipe.getChannelLink(channel)).toBe('/some_type/manage/some_name');
    });

    it('should return a link to /{channelName} page when the channel type is marketplace', () => {
        const channel = <any>{type: 'marketplace', name: 'some_name'};
        expect(ChannelLinkPipe.getChannelLink(channel)).toBe('/some_name');
    });
});
