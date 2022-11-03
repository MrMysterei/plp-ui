import { Component, OnInit } from '@angular/core';
import { Link } from './Link';
import { Category } from './Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    title: string = 'Multipass';
    links!: Link[];
    categories!: Category[];
    filter: string = '';
    apiUrl: string = 'http://localhost:5001/';

    public apiCats: Category[] | undefined;
    public apiLinks: Link[] | undefined;

    constructor(private httpClient: HttpClient) { }

    headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');

    getCategories() {
        this.httpClient.get<any>(`${this.apiUrl}category`, { 'headers': this.headers }).subscribe(
            response => {
                console.log(response);
                this.categories = response;
            }
        );
    }

    getLinks() {
        this.httpClient.get<any>(`${this.apiUrl}link`, { 'headers': this.headers }).subscribe(
            response => {
                console.log(response);
                this.links = response;
            }
        );
    }

    ngOnInit(): void {
        this.getCategories();
        this.getLinks();
    }

    handleSearch(value: string) {
        this.filter = value;
    }

    GetLinksByCategory(catId: number) {
        return this.filter.length > 0
            ? this.links.filter(x => x.categoryId === catId && ((x.title.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) >= 0) || (x.url.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) >= 0)))
            : this.links.filter(x => x.categoryId === catId);
    }
}
