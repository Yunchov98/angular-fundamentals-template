import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CourseListComponent } from './course-list/course-list.component';


const components = [CourseListComponent];

@NgModule({
    declarations: [components],
    imports: [CommonModule, SharedModule, CoursesRoutingModule],
    exports: [components, RouterModule],
})
export class CoursesModule {}
