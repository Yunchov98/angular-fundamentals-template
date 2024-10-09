import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';

import Course from './core/interfaces/course';
import UserMe from './core/interfaces/user-me';

import { CoursesStateFacade } from './store/courses/courses.facade';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'courses-app';
    courses!: { successful: boolean; result: Course[] };
    errorMessage!: string;
    user?: UserMe | null;
    courses$: Observable<Course[]>;

    constructor(
        private userStoreService: UserStoreService,
        private authService: AuthService,
        private coursesFacade: CoursesStateFacade
    ) {
        this.courses$ = this.coursesFacade.courses$;
    }

    ngOnInit(): void {
        this.coursesFacade.getAllCourses();

        this.userStoreService.getUser().subscribe({
            next: (user) => {
                this.user = user;
            },
            error: (error) => (this.errorMessage = error),
        });
    }

    get isLoggedIn(): boolean {
        return this.authService.isAuthorized;
    }

    onLogout() {
        this.authService.logout();
    }
}
