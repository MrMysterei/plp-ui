// Imports
import { Component, Input, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { Category } from '../Category';

// Component Decorator
@Component({
    selector: 'app-links-panel',
    templateUrl: './links-panel.component.html',
    styleUrls: ['./links-panel.component.css']
})

// Class Definition
export class LinksPanelComponent implements OnInit {
    panelTitle: string = 'TBD';
    panelWidth: number = 4;
    panelColor: string = '#FFF';
    links!: any[];
    visible: boolean = true;

    @Input() FilteredLinks!: any[];
    @Input() Category!: Category;

    constructor() { }

    ngOnInit(): void {
        this.links = this.FilteredLinks;

        this.panelTitle = this.Category!.name;
        this.panelColor = this.Category!.color;
    }

    linksCount() {
        return this.links.filter(x => x.categoryId === this.Category.id).length;
    }
}
