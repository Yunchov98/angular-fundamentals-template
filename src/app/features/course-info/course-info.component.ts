import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import Course from '@app/core/interfaces/course';
import { ROUTES } from '@app/core/environments/endpoints';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit {
    course$: Observable<Course | null>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private coursesFacade: CoursesStateFacade
    ) {
        this.course$ = coursesFacade.course$;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.coursesFacade.getSingleCourse(id);
        } else {
            this.router.navigate([ROUTES.courses]);
        }
    }

    onBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
