import { NgModule } from '@angular/core';
import { SoloSearchComponent } from './solo-search.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Module with a solo search input: implementation of a material solo input
 */
@NgModule({
    imports: [CommonModule, MatCardModule, MatProgressBarModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
    declarations: [SoloSearchComponent],
    exports: [SoloSearchComponent],
})
export class SflSoloSearchModule {
}
