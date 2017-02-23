import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Subscription} from "rxjs";

@Injectable()
export class ConfigService implements OnInit, OnDestroy {
    private config: Object = {};
    private subscription: Subscription;
    private loaded: boolean = false;

    constructor(
        private http: Http
    ) {}

    public get(name: string, fallback: any = null) {
        return this.config.hasOwnProperty(name) ? this.config[name] : fallback;
    }

    public load(async: boolean = false): void {
        if (this.loaded) {
            return;
        }

        this.loaded = true;
        this.subscription = this.http.get('config.json')
            .subscribe((response: Response) => {this.config = response.json()});

        if (!async) {
            this.waitToBeLoaded(5);
        }
    }

    public ngOnInit(): void {
        this.load();
    }

    public ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }

    private waitToBeLoaded(secondsToWait: number) {
        let timeoutDate = new Date().getTime() + (secondsToWait*1000);
        while (new Date().getTime() > timeoutDate) {
            if (this.loaded) {
                return;
            }
        }

        throw "Failed to load configuration";
    }
}