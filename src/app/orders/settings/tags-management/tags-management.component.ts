import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewTagDialogComponent } from '../../new-tag-dialog/new-tag-dialog.component';
import { TagsService } from '../../../core/services/tags.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { flatMap, take } from 'rxjs/operators';
import { SET_TAGS } from '../../../core/reducers/tags-reducer';
import { Tag } from '../../../core/entities/tag';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

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
        this.matDialog.open(NewTagDialogComponent).afterClosed().subscribe((tag: Tag) => {
            if (tag && tag.name) {
                this.loading = true;
                this.sendCreateTagRequest(tag).subscribe(
                    () => this.updateTagsData(),
                    error => this.showServerError(error)
                )

            }
        });
    }

    updateTag(tagId, {name, color}) {
        this.matDialog.open(NewTagDialogComponent, {data: {name, color}}).afterClosed().subscribe((tag: Tag) => {
            if (tag && tag.name) {
                this.loading = true;
                this.sendUpdateTagRequest(tag, tagId).subscribe(
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

    protected sendCreateTagRequest({name, color}) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.create(store.id, {name, color})),
        )
    }

    protected sendUpdateTagRequest(tag: Tag, tagId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.update(store.id, tagId, tag)),
        )
    }

    protected sendRemoveTagRequest(tagId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.remove(store.id, tagId)),
        )
    }

    protected showServerError({message}) {
        this.loading = false;
        return this.snackBar.open(message, '', new ErrorSnackbarConfig()
        )
    }

    protected updateTagsData() {
        this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.tagsService.fetchAll(store.id))
        )
            .subscribe(response => response && this.appStore
                .dispatch({type: SET_TAGS, tags: response._embedded.tag}));
    }

}
