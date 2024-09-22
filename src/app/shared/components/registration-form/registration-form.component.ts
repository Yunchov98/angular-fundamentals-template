import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faIcons } from '@app/shared/common/fa-icons';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
    registrationForm!: FormGroup;
    isFormSubmmited!: boolean;
    isValid!: boolean;

    eyeIcon = faIcons.eye;
    eyeSlashIcon = faIcons.eyeSlash;

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
        console.log(this.registrationForm);
    }
}
