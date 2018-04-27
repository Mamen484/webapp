import { EventLinkPipe } from './event-link.pipe';

describe('EventLinkPipe', () => {
  it('create an instance', () => {
    const pipe = new EventLinkPipe();
    expect(pipe).toBeTruthy();
  });

    it('should return proper link for event with name=rule.segmentation', () => {
        const pipe = new EventLinkPipe();
        expect(pipe.transform(<any>{name: 'rule.segmentation', data: {reference: '171717'}}))
            .toEqual('/tools/segmentations#171717');
    });

    it('should return proper link for event with name=rule.transformation', () => {
        const pipe = new EventLinkPipe();
        expect(pipe.transform(<any>{name: 'rule.transformation', data: {reference: '171717'}}))
            .toEqual('/tools/rules#171717');
    });

    it('should return proper link for event with name=order.lifecycle', () => {
        const pipe = new EventLinkPipe();
        expect(pipe.transform(<any>{name: 'order.lifecycle', data: {reference: '171717'}}))
            .toEqual('/marketplaces/orders/171717');
    })
});
