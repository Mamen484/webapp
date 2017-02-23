Progressbar
===

This component provides our generic progressbar.
The size of the progressbar is defined by the parent's node size. It must always be a block or an inline-block.

Usage
---

```html
<app-progressbar style="display: block; width: 100px; height: 30px;"
                 [progress]="60"
                 [text]="'the progressbar text'"
                 >
</app-progressbar>
```

Inputs:
---

- progress: The progress value, between 0 and 100.
- text: A text to display over the progressbar