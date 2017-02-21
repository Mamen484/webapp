import {Pipe, PipeTransform} from "@angular/core";
import {ConfigService} from "../config/config.service";

@Pipe({
    name: 'asset'
})
export class AssetPipe implements PipeTransform {
    constructor(
        private config: ConfigService
    ) {}

    transform(path: string): string {
        return this.config.get('app', {}).prefix + '/assets/' + path;
    }
}