import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewTagDialogComponent } from '../new-tag-dialog/new-tag-dialog.component';
import { TagsService } from '../../core/services/tags.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { flatMap, take } from 'rxjs/operators';
import { SET_TAGS } from '../../core/reducers/tags-reducer';
import { Tag } from '../../core/entities/tag';

@Component({
    selector: 'sf-tags-management',
    templateUrl: './tags-management.component.html',
    styleUrls: ['./tags-management.component.scss']
})
export class TagsManagementComponent implements OnInit {

    tags: Tag[];
    loading = true;

    constructor(protected matDialog: MatDialog,
                protected tagsService: TagsService,
                protected appStore: Store<AppState>,
                protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.appStore.select('tags').subscribe(tags => {
            if (tags) {
                this.tags = tags;
                this.loading = false;
            }
        });
    }

    createNewTag() {
        this.matDialog.open(NewTagDialogComponent).afterClosed().subscribe((tagName: string) => {
            if (tagName) {
                this.loading = true;
                this.sendCreateTagRequest(tagName).subscribe(
                    () => this.updateTagsData(),
                    error => this.showServerError(error)
                )

            }
        });
    }

    updateTag(tagId, name) {
        this.matDialog.open(NewTagDialogComponent, {data: {name}}).afterClosed().subscribe((tagName: string) => {
            if (tagName) {
                this.loading = true;
                this.sendUpdateTagRequest(tagName, tagId).subscribe(
                    () => this.updateTagsData(),
                    error => this.showServerError(error)
                )

            }
        });
    }

    removeTag(tagId) {
        this.loading = true;
        this.sendRemoveTagRequest(tagId).subscribe(
            () => this.updateTagsData(),
            error => this.showServerError(error)
        );
    }

    protected sendCreateTagRequest(tagName) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.create(store.id, {name: tagName, color: '#1976d2'})),
        )
    }

    protected sendUpdateTagRequest(tagName, tagId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.update(store.id, tagId, {name: tagName, color: '#1976d2'})),
        )
    }

    protected sendRemoveTagRequest(tagId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.remove(store.id, tagId)),
        )
    }

    protected showServerError({message}) {
        return this.snackBar.open(message, '', {
                panelClass: 'sf-snackbar-error',
                duration: 5000,
            }
        )
    }

    protected updateTagsData() {
        this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.fetchAll(store.id))
        )
            .subscribe(response => response && this.appStore.select('tags')
                .dispatch({type: SET_TAGS, tags: response._embedded.tag}));
    }

}
