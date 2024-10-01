import { Component, OnInit } from '@angular/core';

import { UserStoreService } from './user/services/user-store.service';
import { AuthService } from './auth/services/auth.service';

import Course from './core/interfaces/course';
import UserMe from './core/interfaces/user-me';

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

    constructor(
        private userStoreService: UserStoreService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
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
