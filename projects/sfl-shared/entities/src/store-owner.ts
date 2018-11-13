export class StoreOwner {
    email ?= '';
    login ?= '';
    password ?= '';
    phone ?= '';
    token?: string; // GET requests
    tokens?: string[]; // POST requests
}
