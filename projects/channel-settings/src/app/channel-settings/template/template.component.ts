import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';
import { FormControl } from '@angular/forms';
import { ChannelTemplate } from 'sfl-shared/entities/channel-template';

@Component({
    selector: 'sfcs-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit {

    @Input() channelId: number;

    fields: {[prop in keyof ChannelTemplate]: FormControl}[] = [];

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.addField();
    }

    addField() {
        this.fields.push({
            channelField: new FormControl(),
            sfField: new FormControl(),
            defaultValue: new FormControl(),
        });
    }

    removeField(field) {
        this.fields.splice(this.fields.indexOf(field), 1);
    }

    save() {
        this.channelService.modifyChannel({
            template: this.fields.map(field => ({
                channelField: field.channelField.value,
                sfField: field.sfField.value,
                defaultValue: field.defaultValue.value,
            })),
        }, this.channelId).subscribe();
    }

}
