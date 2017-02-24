import {NgModule, APP_INITIALIZER} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ConfigService} from "./config.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (config: ConfigService) => () => {config.load()},
            deps: [ConfigService]
        }
    ]
})
export class ConfigModule {}