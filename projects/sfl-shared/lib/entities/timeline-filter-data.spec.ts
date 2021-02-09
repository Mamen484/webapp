import { TimelineFilterData } from './timeline-filter-data';
import { TimelineTypeFilter } from './timeline-type-filter.enum';
import { DateFilter } from './date-filter.enum';

describe('TimelineFilterData', () => {
    let data: TimelineFilterData;

    beforeEach(() => {
        data = new TimelineFilterData();
    });

    it('should set dateFilter and update isActive flag', () => {
        expect(data.isActive).toEqual(false);
        data.dateFilter = DateFilter.today;
        expect(data.dateFilter).toEqual(DateFilter.today);
        expect(data.isActive).toEqual(true);
    });

    it('should set typeFilter and update isActive flag', () => {
        expect(data.isActive).toEqual(false);
        data.typeFilter = TimelineTypeFilter.rules;
        expect(data.typeFilter).toEqual(TimelineTypeFilter.rules);
        expect(data.isActive).toEqual(true);
    });

    it('should set isActive to false when the dateFilter is `custom` neither dateSince nor dateUntil are specified', () => {
        expect(data.isActive).toEqual(false);
        data.dateFilter = DateFilter.custom;
        expect(data.isActive).toEqual(false);
    });


    it('should set isActive to false when the dateFilter is NOT specified and dateSince is specified', () => {
        expect(data.isActive).toEqual(false);
        data.dateSince = new Date();
        expect(data.isActive).toEqual(false);
    });

    it('should set isActive to false when the dateFilter is NOT specified and dateUntil is specified', () => {
        expect(data.isActive).toEqual(false);
        data.dateUntil = new Date();
        expect(data.isActive).toEqual(false);
    });

    it('should set isActive to false when dateSince and dateUntil are deleted but dateFilter is custom', () => {
        data.applyValue({dateFilter: DateFilter.custom, dateSince: new Date(), dateUntil: new Date(), typeFilter: undefined});
        expect(data.isActive).toEqual(true);
        data.dateSince = undefined;
        expect(data.isActive).toEqual(true);
        data.dateUntil = undefined;
        expect(data.isActive).toEqual(false);
    });
});
