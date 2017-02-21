import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Subscription} from "rxjs";

@Injectable()
export class ConfigService implements OnInit, OnDestroy {
    private config: Object;
    private subscription: Subscription;
    private loaded: boolean = false;

    constructor(
        private http: Http
    ) {}

    public get(name: string, fallback: any = null) {
        return this.config.hasOwnProperty(name) ? this.config[name] : fallback;
    }

    public load(): void {
        if (!this.loaded) {
            return;
        }

        this.loaded = true;
        this.subscription = this.http.get('config.json')
            .subscribe((response: Response) => {this.config = response.json()});
    }

    ngOnInit(): void {
        this.load();
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }
}