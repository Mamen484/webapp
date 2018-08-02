export interface OrderDetailsItem {
    /**
     * Sku can contain an OrderItem reference alias, if exists, or OrderItem reference itself
     */
    sku: string;
    name: string;
    quantity: number;
    date: string;
    price: number;
    image: string;
    /**
     * Contains OrderItem reference
     */
    reference: string;
}
