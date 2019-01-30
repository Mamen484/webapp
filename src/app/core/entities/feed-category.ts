interface Category {
    id: number;
    catalogId: number;
    name: string;
}

export interface FeedCategory {
    catalogCategory: Category,
    channelCategory: Category,
}
