import { EventIconPipe } from './event-icon.pipe';
import { TimelineEventName } from '../../../../projects/sfl-shared/lib/entities/timeline-event-name.enum';

describe('EventIconPipe', () => {
  it('create an instance', () => {
    const pipe = new EventIconPipe();
    expect(pipe).toBeTruthy();
  });

    it('should return an icon for a shopping_basket icon for an order.lifecycle event', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform(TimelineEventName.orderLifecycle)).toEqual('shopping_basket');
    });

    it('should return an icon for a build icon for an rule.transformation event', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform(TimelineEventName.ruleTransformation)).toEqual('build');
    });

    it('should return an icon for a build icon for an rule.segmentation event', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform(TimelineEventName.ruleSegmentation)).toEqual('build');
    });

    it('should return an icon for a vertical_align_bottom icon for an feed.import event', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform(TimelineEventName.import)).toEqual('vertical_align_bottom');
    });

    it('should return an icon for a vertical_align_top icon for an feed.export event', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform(TimelineEventName.export)).toEqual('vertical_align_top');
    });

    it('should return an icon for an error_outline icon when an error is passed', () => {
        const pipe = new EventIconPipe();
        expect(pipe.transform('error')).toEqual('error_outline');
    });
});
