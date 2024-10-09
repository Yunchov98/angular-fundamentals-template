import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import Course from '@app/core/interfaces/course';
import { ROUTES } from '@app/core/environments/endpoints';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
    searchSubscribe$!: Subscription;
    courses$: Observable<Course[]> | null;
    errorMessage$: Observable<string | null>;
    filteredCourses$!: Observable<Course[] | null>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private coursesFacade: CoursesStateFacade
    ) {
        this.courses$ = this.coursesFacade.allCourses$;
        this.errorMessage$ = this.coursesFacade.errorMessage$;
    }

    ngOnInit(): void {
        this.coursesFacade.getAllCourses();

        this.route.queryParams.subscribe((params) => {
            const title = params['title'];

            if (title) {
                this.coursesFacade.getFilteredCourses(title);
            } else {
                this.coursesFacade.getAllCourses();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.searchSubscribe$ !== undefined) {
            this.searchSubscribe$.unsubscribe();
        }
    }

    onShowCourse(course: Course) {
        this.router.navigate([ROUTES.singleComponent(course.id)]);
    }

    onSearch(searchTerm: string): void {
        this.router.navigate([ROUTES.filteredCourses], {
            queryParams: { title: searchTerm.split(' ').join(',') },
        });
    }
}
