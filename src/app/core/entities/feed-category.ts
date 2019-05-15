interface Category {
    id: number;
    catalogId: number;
    name: string;
}

export interface FeedCategory {
    catalogCategory: Category,
    channelCategory: Category,
    feedId: number;
    id: number;
}
