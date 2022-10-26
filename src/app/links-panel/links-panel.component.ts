// Imports
import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../Category';
import { CATEGORIES } from '../mock-categories';

// Component Decorator
@Component({
    selector: 'app-links-panel',
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

    @Input() filteredLinks!: any[];
    @Input() PanelTitle!: string;
    @Input() PanelTypeId!: number;
    @Input() PanelWidth!: number;

    constructor() { }

    ngOnInit(): void {
        this.links = this.filteredLinks;

        if (this.links.length > 0) {
            let currentCategoryId = this.links[0].categoryId;

            this.category = CATEGORIES.find(x => x.id === currentCategoryId);

            this.panelTitle = this.category!.name;
            this.panelColor = this.category!.color;
        }
    }
}
