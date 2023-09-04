import { ClassComponent } from './class.component';
import { ClassFormDialogComponent } from './components/class-form-dialog/class-form-dialog.component';
import { ClassRoutingModule } from './class-routing.module';
import { ClassTableComponent } from './components/class-table/class-table.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    ClassComponent,
    ClassFormDialogComponent,
    ClassTableComponent,

  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    SharedModule,
    RouterModule,
  ],
  exports:[ClassComponent],
})
export class ClassModule { }
