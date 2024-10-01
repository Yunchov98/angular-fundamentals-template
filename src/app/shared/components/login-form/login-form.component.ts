import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { ROUTES } from '@app/core/environments/endpoints';
import User from '@app/core/interfaces/user.interface';
import { faIcons } from '@app/shared/common/fa-icons';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Subscription } from 'rxjs';

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
