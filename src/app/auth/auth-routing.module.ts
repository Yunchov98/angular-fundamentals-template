import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    LoginFormComponent,
    RegistrationFormComponent,
} from '@app/shared/components';

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
