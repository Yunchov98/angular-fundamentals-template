import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ROUTES } from '@app/core/environments/endpoints';
import { faIcons } from '@app/shared/common/fa-icons';

import { AuthService } from '@app/auth/services/auth.service';

import User from '@app/core/interfaces/user';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
    registrationForm!: FormGroup;
    isFormSubmmited!: boolean;
    isValid!: boolean;
    registrationSubscription$!: Subscription;
    errorMessage!: string;

    eyeIcon = faIcons.eye;
    eyeSlashIcon = faIcons.eyeSlash;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    onRegister(): void {
        this.isFormSubmmited = true;

        if (this.registrationForm.invalid) return;

        const user: User = {
            email: this.registrationForm.value.email,
            name: this.registrationForm.value.name,
            password: this.registrationForm.value.password,
        };

        this.registrationSubscription$ = this.authService
            .register(user)
            .subscribe({
                next: () => {
                    this.router.navigate([ROUTES.login]);
                },
                error: (error) => (this.errorMessage = error),
            });
    }

    ngOnDestroy(): void {
        if (this.registrationSubscription$ !== undefined) {
            this.registrationSubscription$.unsubscribe();
        }
    }
}
