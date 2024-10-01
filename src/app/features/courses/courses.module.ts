import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { CourseListComponent } from './course-list/course-list.component';
import { RouterModule, Routes } from '@angular/router';
import {
    CourseCardComponent,
    CourseFormComponent,
} from '@app/shared/components';
import { CoursesComponent } from './courses.component';

import { AdminGuard } from '@app/user/guards/admin.guard';

const components = [CourseListComponent];

const routes: Routes = [
    { path: 'courses', component: CoursesComponent },
    { path: 'add', canActivate: [AdminGuard], component: CourseFormComponent },
    {
        path: 'edit/:id',
        canActivate: [AdminGuard],
        component: CourseFormComponent,
    },
    {path: 'courses/filter', component: CoursesComponent}
    // { path: ':id', component: CourseCardComponent },
];

@NgModule({
    declarations: [components],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
    exports: [components, RouterModule],
})
export class CoursesModule {}
