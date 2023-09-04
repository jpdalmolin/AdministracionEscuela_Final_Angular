import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail.component';
import { CoursesFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesTableComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    RouterModule,
  ],
  exports:[CoursesComponent],
})
export class CoursesModule { }