export enum TimelineEventOperation {
    // TimelineEvent.name = rule.*
    'update' = 'update',
    create = 'create',
    delete = 'delete',
    read = 'read',

    // TimelineEvent.name = order.lifecycle
    import = 'import',
    ship = 'ship'
}
