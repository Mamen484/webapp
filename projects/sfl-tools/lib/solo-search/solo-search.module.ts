import { NgModule } from '@angular/core';
import { SoloSearchComponent } from './solo-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
export class SftSoloSearchModule {
}
