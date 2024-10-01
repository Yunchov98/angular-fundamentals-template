import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Author from '@app/core/interfaces/author.interface';
import { CoursesService } from '@app/services/courses.service';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
    @Input() title!: string;
    @Input() description!: string;
    @Input() creationDate!: Date;
    @Input() duration!: number;
    @Input() authors?: string[];
    @Input() editable!: boolean;

    @Output() clickOnShow = new EventEmitter<void>();

    populatedAuthors: string[] = [];
    errorMessage!: string;

    constructor(private coursesService: CoursesService) {}

    ngOnInit(): void {
        if (this.authors) {
            this.authors.map((authorId) => {
                this.coursesService.getAuthorById(authorId).subscribe({
                    next: (response) => {
                        if (response.successful) {
                            this.populatedAuthors = [
                                ...this.populatedAuthors,
                                response.result.name,
                            ];
                        }
                    },
                    error: (error) => (this.errorMessage = error.error.message),
                });
            });
        }
    }

    onShowCourse() {
        this.clickOnShow.emit();
    }
}
