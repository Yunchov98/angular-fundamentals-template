import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faIcons } from '@app/shared/common/fa-icons';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    @ViewChild('loginForm') public loginForm!: NgForm;
    isFormSubmmited!: boolean;

    eyeIcon = faIcons.eye;
    eyeSlashIcon = faIcons.eyeSlash;

    onSubmit(): void {
        this.isFormSubmmited = true;
    }
}
