// Imports
import { Component, Input, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { Category } from '../Category';

// Component Decorator
@Component({
    selector: 'links-panel',
    templateUrl: './links-panel.component.html',
    styleUrls: ['./links-panel.component.css']
})

// Class Definition
export class LinksPanelComponent implements OnInit {
    panelTitle: string = 'TBD';
    panelTypeId: number = 4;
    panelWidth: number = 3;
    panelColor: string = 'silver';
    links!: any[];
    category!: Category | undefined;
    visible: boolean = true;

    @Input() FilteredLinks!: any[];
    @Input() Categories!: Category[];
    @Input() PanelTitle!: string;
    @Input() PanelTypeId!: number;
    @Input() PanelWidth!: number;

    constructor() { }

    ngOnInit(): void {
        this.links = this.FilteredLinks;

        if (this.links.length > 0) {
            let currentCategoryId = this.links[0].categoryId;

            this.category = this.Categories.find(x => x.id === currentCategoryId);

            this.panelTitle = this.category!.name;
            this.panelColor = this.category!.color;
        }
    }

    categoryLinksCount(catId: number) {
        return this.Categories.filter(x => x.id === catId).length;
    }
}
