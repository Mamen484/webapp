import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { AmazonAccountDialogComponent } from '../amazon-account-dialog/amazon-account-dialog.component';
import { WelcomeInstructionsComponent } from '../welcome-instructions/welcome-instructions.component';
import { ChannelService } from '../../core/services/channel.service';
import { ChannelMap } from '../../core/entities/channel-map.enum';
import { Category } from '../../core/entities/category';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;

    categories: Category[];

    subscription: Subscription;

    constructor(protected matDialog: MatDialog, protected channelService: ChannelService) {
    }

    ngOnInit() {
        // prevent 'Expression has changed after it was checked' message
        setTimeout(() => this.showDialogs());
        this.updateData();
    }

    pageChanged(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.updateData();
    }

    protected showDialogs() {
        this.matDialog.open(AmazonAccountDialogComponent, {disableClose: true})
            .afterClosed()
            .subscribe(() => this.matDialog.open(WelcomeInstructionsComponent, {disableClose: true}));
    }

    protected updateData() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.channelService.getChannelCategories(ChannelMap.amazon.toString(), {
            page: (this.currentPage + 1).toString(),
            limit: this.itemsPerPage
        }).subscribe(categories => {
            this.categories = categories._embedded.category;
            this.totalCategoriesNumber = categories.total;
        });
    }

}
