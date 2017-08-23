export enum TimelineEventOperation {
    // TimelineEvent.type = transformation.*
    'update' = 'update',
    create = 'create',
    delete = 'delete',
    read = 'read',

    // TimelineEvent.type = order.lifecycle
    import = 'import',
    ship = 'ship'
}
