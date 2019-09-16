export class StoreOwner {
    id?: number;
    email ?= '';
    login ?= '';
    password ?= '';
    phone ?= '';
    token?: string; // GET requests
    tokens?: string[]; // POST requests
    payment?: 'other' | 'card';
}
