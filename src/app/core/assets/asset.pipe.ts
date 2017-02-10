import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'asset'
})
export class AssetPipe implements PipeTransform {
    transform(path: string): string {
        return '/assets/'+path;
    }
}