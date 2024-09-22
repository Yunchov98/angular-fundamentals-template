import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import Author from '@app/core/interfaces/author';
import { faIcons } from '@app/shared/common/fa-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    constructor(public fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
    courseForm!: FormGroup;
    authorsList: Author[] = [];
    courseAuthors: Author[] = [];
    authorIdCounter = 1;
    isFormSubmmited!: boolean;

    addIcon = faIcons.add;
    deleteIcon = faIcons.delete;
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

    ngOnInit(): void {
        console.log(this.deleteIcon);

        this.courseForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
            ]),
            duration: new FormControl(0, [
                Validators.required,
                Validators.min(0),
            ]),
            authors: this.fb.array([]),
            newAuthor: new FormGroup({
                author: new FormControl(null, [
                    Validators.minLength(2),
                    Validators.pattern('^[a-zA-Z0-9]+$'),
                ]),
            }),
        });
    }

    get authors(): FormArray {
        return this.courseForm.get('authors') as FormArray;
    }

    addAuthor() {
        const authorNameControl = this.courseForm.get('newAuthor.author');

        if (authorNameControl?.value === null) return;

        const newAuthor: Author = {
            id: this.authorIdCounter++,
            name: authorNameControl?.value,
        };

        this.authorsList.push(newAuthor);

        authorNameControl?.reset();
    }

    assignAuthor(author: Author) {
        this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
        this.courseAuthors.push(author);

        console.log('authors list', this.authorsList);
        console.log('course list', this.courseAuthors);
    }

    removeAuthor(author: Author) {
        this.authorsList.push(author);
        this.courseAuthors = this.courseAuthors.filter(
            (a) => a.id !== author.id
        );
    }

    onSubmit() {
        this.isFormSubmmited = true;
        console.log('Form Submmited!');
    }
}
