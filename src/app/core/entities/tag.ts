import { TagColor } from './orders/tag-color';

export interface Tag {
    id?: number; // required when fetch tags
    storeId?: number; // required when fetch tags
    name: string;
    color: TagColor;
}
