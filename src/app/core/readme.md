Core module
===

This module exports all the Shopping Feed core components.

Usage
---

In your module, you may import CoreModule to use its components:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "core.module"; // Don't forget to adapt the path to your need

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class MyAwesomeModule {}
```

List of components
---

- [Progressbar](progressbar/readme.md)
- [Menu](menu/readme.md)