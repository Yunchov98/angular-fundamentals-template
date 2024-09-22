import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @Input() placeholder!: string;
    @Output() search = new EventEmitter<string>();

    onSearch(value: string) {
        this.search.emit(value);
    }
}
