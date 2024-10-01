import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '@app/core/environments/endpoints';

import Author from '@app/core/interfaces/author.interface';
import CourseForm from '@app/core/interfaces/course-form.interface';
import Course from '@app/core/interfaces/course.interface';

import { CoursesStoreService } from '@app/services/courses-store.service';

import { faIcons } from '@app/shared/common/fa-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
    constructor(
        private coursesStoreService: CoursesStoreService,
        private router: Router,
        public fb: FormBuilder,
        public library: FaIconLibrary
    ) {
        library.addIconPacks(fas);
        this.buildForm();
    }
    courseForm!: FormGroup;
    authorsList: Author[] = [];
    courseAuthors: Author[] = [];
    authorIdCounter = 1;
    isFormSubmmited!: boolean;
    author!: Author;
    authorsId: string[] = [];
    errorMessage!: string;

    addIcon = faIcons.add;
    deleteIcon = faIcons.delete;

    buildForm(): void {
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
                name: new FormControl(null, [
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
        const authorNameControl = this.courseForm.get('newAuthor.name');

        if (authorNameControl?.value === null) {
            return;
        }

        this.coursesStoreService
            .createAuthor(authorNameControl?.value)
            .subscribe({
                next: (author) => {
                    this.author = author;

                    const authorFormGroup = new FormGroup({
                        id: new FormControl(author.id),
                        name: new FormControl(author.name),
                    });
                    this.authors.push(authorFormGroup);

                    this.authorsId.push(author.id.toString());
                    console.log(this.authorsId);
                },
                error: (error) => (this.errorMessage = error),
                complete: () => {
                    for (const author of this.authors.controls) {
                        console.log(author.get('id')?.value)
                    }
                },
            });

        authorNameControl?.reset();
    }

    // assignAuthor(author: Author) {
    //     this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
    //     this.courseAuthors.push(author);
    // }

    removeAuthor(id: string) {
        this.authorsId.filter((authorId) =>  authorId !== id);
        console.log(`Deleted author with id -> ${id}`);
    }

    onSubmit() {
        const course: CourseForm = {
            title: this.courseForm.get('title')?.value,
            description: this.courseForm.get('description')?.value,
            duration: this.courseForm.get('duration')?.value,
            authors: this.authorsId,
        };
        this.coursesStoreService.createCourse(course);
        this.isFormSubmmited = true;
        this.router.navigate([ROUTES.courses]);
    }
}
