import { TimelineFilter } from './timeline-filter';
import { DateFilter } from './date-filter.enum';
import { TimelineFilterData } from './timeline-filter-data';
import { TimelineTypeFilter } from './timeline-type-filter.enum';

describe('TimelineFilter', () => {
    beforeEach(() => {
        let baseTime = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
        jasmine.clock().mockDate(baseTime);
    });

    it('should set custom dates', () => {
        let data = new TimelineFilterData();
        data.dateFilter = DateFilter.custom;
        data.dateSince = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
        data.dateUntil = new Date(Date.UTC(2017, 5, 14, 2, 22, 42));
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since.getTime()).toEqual(1497406961000);
        expect(filter.until.getTime()).toEqual(1497406962000);
    });

    it('should set appropriate since value for `today` dateFilter', () => {
        let data = new TimelineFilterData();
        data.dateFilter = DateFilter.today;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since.getFullYear()).toEqual(2017);
        expect(filter.since.getMonth()).toEqual(5);
        expect(filter.since.getDate()).toEqual(14);
        expect(filter.since.getHours()).toEqual(0);
        expect(filter.since.getMinutes()).toEqual(0);
        expect(filter.since.getSeconds()).toEqual(0);
    });

    it('should set appropriate since and until values for `yesterday` dateFilter', () => {
        let data = new TimelineFilterData();
        data.dateFilter = DateFilter.yesterday;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since.getFullYear()).toEqual(2017);
        expect(filter.since.getMonth()).toEqual(5);
        expect(filter.since.getDate()).toEqual(13);
        expect(filter.since.getHours()).toEqual(0);
        expect(filter.since.getMinutes()).toEqual(0);
        expect(filter.since.getSeconds()).toEqual(0);

        expect(filter.until.getFullYear()).toEqual(2017);
        expect(filter.until.getMonth()).toEqual(5);
        expect(filter.until.getDate()).toEqual(14);
        expect(filter.until.getHours()).toEqual(0);
        expect(filter.until.getMinutes()).toEqual(0);
        expect(filter.until.getSeconds()).toEqual(0);
    });

    it('should set appropriate since value for `lastWeek` dateFilter', () => {
        let data = new TimelineFilterData();
        data.dateFilter = DateFilter.lastWeek;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since.getTime()).toEqual(1496802161000); // 2017-06-07 2:22:41
    });

    it('should set appropriate since value for `lastMonth` dateFilter', () => {
        let data = new TimelineFilterData();
        data.dateFilter = DateFilter.lastMonth;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since.getTime()).toEqual(1494814961000); // 2017-05-15 2:22:41
    });

    it('should set default values', () => {
        let data = new TimelineFilterData();
        let filter = TimelineFilter.createFrom(data);
        expect(filter.since).not.toBeDefined();
        expect(filter.until).not.toBeDefined();
        expect(filter.name.join(',')).toEqual('feed.import,feed.export,order.lifecycle,rule.transformation,rule.segmentation');
        expect(filter.action.join(',')).toEqual('create,push,delete,ship,update,error');
    });

    it('should set a right action for `import` typeFilter', () => {
        let data = new TimelineFilterData();
        data.typeFilter = TimelineTypeFilter.import;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.name.toString()).toEqual('feed.import');
    });

    it('should set a right action for `export` typeFilter', () => {
        let data = new TimelineFilterData();
        data.typeFilter = TimelineTypeFilter.export;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.name.toString()).toEqual('feed.export');
    });

    it('should set a right action for `rules` typeFilter', () => {
        let data = new TimelineFilterData();
        data.typeFilter = TimelineTypeFilter.rules;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.name.toString()).toEqual('rule.transformation');
    });

    it('should set a right action for `autoRemove` typeFilter', () => {
        let data = new TimelineFilterData();
        data.typeFilter = TimelineTypeFilter.autoRemove;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.name.toString()).toEqual('rule.segmentation');
    });

    it('should set a right action for `orders` typeFilter', () => {
        let data = new TimelineFilterData();
        data.typeFilter = TimelineTypeFilter.orders;
        let filter = TimelineFilter.createFrom(data);
        expect(filter.name.toString()).toEqual('order.lifecycle');
    });
});
