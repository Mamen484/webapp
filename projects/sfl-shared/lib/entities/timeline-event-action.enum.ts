export enum TimelineEventAction {
    // TimelineEvent.name = rule.*
    update = 'update',
    create = 'create',
    delete = 'delete',

    // TimelineEvent.name = order.lifecycle
    push = 'push',
    ship = 'ship',

    // TimelineEvent.name = feed.import | feed.export
    ask = 'ask',
    start = 'start',
    finish = 'finish',
    error = 'error',
    cancel = 'cancel',
}
