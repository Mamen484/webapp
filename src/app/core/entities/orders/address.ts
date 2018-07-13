export interface Address {
    firstName: string;
    lastName: string;
    street?: string;
    street2?: string;
    postalCode?: string;
    city?: string;
    phone?: string;
    mobilePhone: string;
    email?: string;
    country?: string; // ISO alpha-2
    company?: string;
    other?: string;
}
