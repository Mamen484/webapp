export interface StoreOwner {
    email?: string;
    login?: string;
    password?: string;
    token?: string; // GET requests
    tokens?: string[]; // POST requests
}
