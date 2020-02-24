import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
    it('should highlight a searched substring', () => {
        const pipe = new HighlightPipe();
        expect(pipe.transform('some text', 'om')).toBe('s<span class="sf-color-accent">om</span>e text');
    });

    it('should not remove spaces', () => {
        const pipe = new HighlightPipe();
        expect(pipe.transform('Lot de Livres et de Revues', 'de'))
            .toBe('Lot&nbsp;<span class="sf-color-accent">de</span>&nbsp;Livres et&nbsp;<span class="sf-color-accent">de</span>&nbsp;Revues');
    });
});
