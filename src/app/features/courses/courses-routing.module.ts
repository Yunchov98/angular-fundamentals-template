import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '@app/user/guards/admin.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';

const routes: Routes = [
    {
        path: 'courses',
        canActivate: [AuthorizedGuard],
        component: CoursesComponent,
    },
    {
        path: 'add',
        canActivate: [AdminGuard, AuthorizedGuard],
        component: CourseFormComponent,
    },
    {
        path: 'edit/:id',
        canActivate: [AdminGuard, AuthorizedGuard],
        component: CourseFormComponent,
    },
    { path: 'courses/filter', component: CoursesComponent },
    {
        path: ':id',
        canActivate: [AuthorizedGuard],
        component: CourseInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoursesRoutingModule {}
