import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @ViewChild('searchForm') public searchForm!: NgForm;
    @Input() placeholder!: string;
    @Output() search = new EventEmitter<string>();

    searchTerm!: string;

    onSubmit() {
        if (this.searchTerm) {
            this.search.emit(this.searchTerm);
        }
    }
}
