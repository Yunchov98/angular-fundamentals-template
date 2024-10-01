import { Component, OnInit } from '@angular/core';
import Course from './core/interfaces/course';
import { UserStoreService } from './user/services/user-store.service';
import { AuthService } from './auth/services/auth.service';
import UserMe from './core/interfaces/user-me';
import { UserService } from './user/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'courses-app';
    courses!: { successful: boolean; result: Course[] };
    errorMessage!: string;
    user?: UserMe;

    constructor(
        private userStoreService: UserStoreService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userStoreService.getUser();
        this.userService.getUser().subscribe({
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
