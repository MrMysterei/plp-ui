import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.css']
})

export class GlobalSearchComponent implements OnInit {

    @Output() searchValue = new EventEmitter<string>();

    handleSearchValue(event: any) {
        const { target } = event;
        this.searchValue.emit(target.value);
    }

    constructor() { }

    ngOnInit(): void {
    }
}
