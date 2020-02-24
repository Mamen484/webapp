import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(text: string, search): string {
        return search ? this.highlight(text, search) : text;
    }

    highlight(text, search) {
        return text
            .replace(new RegExp(search, 'gi'), match => `<span class="sf-color-accent">${match}</span>`)
            // escape the space before and after the highlighted text to properly display the space
            .replace(/>\s/gi, '>&nbsp;')
            .replace(/\s(?=<)/gi, '&nbsp;');
    }

}
