import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { Statistics } from './statistics';
import { TimelineEventFormatted } from './timeline-event-formatted';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    storeStatistics: Statistics
}
