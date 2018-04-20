import {cloneDeep} from 'lodash';
import { Tag } from '../entities/tag';

export const SET_TAGS = 'SET_TAGS';

export function tagsReducer(state, {type, tags}: { type: string, tags?: Tag[] }) {
    switch (type) {

        case SET_TAGS:
            return cloneDeep(tags.filter(tag => tag.name));

        default:
            return state;
    }
}