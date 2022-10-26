import { Component, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.css']
})

export class LinkComponent implements OnInit {
    @Input() linkList!: any[];

    constructor() { }

    ngOnInit(): void {
        // 
    }
} 