import { Directive } from '@angular/core';
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from '@angular/forms';

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const email = control.value;

        if (!email) {
            return null;
        }

        const isEmailValid = emailRegEx.test(email);

        return isEmailValid ? null : { invalidEmail: true };
    }
}
