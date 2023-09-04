import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // /dashboard/courses
        path: '',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CoursesDetailComponent
      }
      
      
      
    ])
  ],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
