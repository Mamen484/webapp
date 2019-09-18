export interface MappingCollection {
    count: number;
    _embedded: {
        mapping: {
            catalogField: string;
            standardField: string;
        }[];
    }
}
