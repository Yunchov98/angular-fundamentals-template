import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

import { ModalComponent } from './components/modal/modal.component';
import {
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    CourseCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CourseFormComponent,
} from './components';

import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';

const components = [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    CourseCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CourseFormComponent,
    DurationPipe,
    CustomDatePipe,
    EmailValidatorDirective,
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [components],
})
export class SharedModule {}
