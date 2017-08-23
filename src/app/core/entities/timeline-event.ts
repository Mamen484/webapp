import { Link } from './link';

export interface TimelineEvent {
    'type': string;
    'operation': 'update' | 'create' | 'delete' | 'read' | 'import';
    'occurredAt': string;
    '_embedded': {
        'rules': [
            {
                '_links': {
                    'self': Link
                },
                'id': number,
                'name': string
            }
            ]
    }
}
