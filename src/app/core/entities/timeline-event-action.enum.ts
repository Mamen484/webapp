export enum TimelineEventAction {
    // TimelineEvent.name = rule.*
    'update' = 'update',
    'create' = 'create',
    'delete' = 'delete',

    // TimelineEvent.name = order.lifecycle
    push = 'push',
    ship = 'ship'
}
