import { Pipe } from '@angular/core';
import Author from '@app/core/interfaces/author';

@Pipe({
    name: 'authors',
})
export class AuthorsPipe {
    transform(authors: Author[] | string[] | undefined) {
        if(authors) {
            return authors.join(', ');
        }

        return [];
    }
}
