import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { CourseListComponent } from './course-list/course-list.component';

const components = [CourseListComponent];

@NgModule({
    declarations: [components],
    imports: [CommonModule, SharedModule],
    exports: [components],
})
export class CoursesModule {}
