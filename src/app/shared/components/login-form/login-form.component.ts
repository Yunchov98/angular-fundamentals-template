import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ROUTES } from '@app/core/environments/endpoints';
import { faIcons } from '@app/shared/common/fa-icons';

import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';

import User from '@app/core/interfaces/user';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnDestroy {
    @ViewChild('loginForm') public loginForm!: NgForm;
    isFormSubmmited!: boolean;
    loginSubscribe$!: Subscription;
    errorMessage!: string;

    eyeIcon = faIcons.eye;
    eyeSlashIcon = faIcons.eyeSlash;

    constructor(
        private authService: AuthService,
        private userStoreService: UserStoreService,
        private router: Router
    ) {}

    onSubmit(): void {
        const user: User = {
            name: '',
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
        };

        this.loginSubscribe$ = this.authService.login(user).subscribe({
            next: () => {
                this.userStoreService.getUser();
                this.router.navigate([ROUTES.courses]);
            },
            error: (error) => {
                this.errorMessage = error.error.result;
            },
        });
    }

    ngOnDestroy(): void {
        if (this.loginSubscribe$ !== undefined) {
            this.loginSubscribe$.unsubscribe();
        }
    }
}
