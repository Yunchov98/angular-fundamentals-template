import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { TogglePasswordDirective } from './directives/toggle-password.directive';

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
import { AuthorsPipe } from './pipes/authors.pipe';
import { RouterModule, Routes } from '@angular/router';

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
    AuthorsPipe,
    EmailValidatorDirective,
    TogglePasswordDirective,
];

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [components, RouterModule],
})
export class SharedModule {}
