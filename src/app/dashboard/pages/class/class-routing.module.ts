import { RouterModule, Routes } from '@angular/router';

import { ClassComponent } from './class.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // /dashboard/class
        path: '',
        component: ClassComponent,
      }
      
      
      
    ])
  ],
  exports: [RouterModule],
})
export class ClassRoutingModule { }
