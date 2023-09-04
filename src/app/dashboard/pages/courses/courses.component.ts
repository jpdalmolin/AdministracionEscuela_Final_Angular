import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Courses } from './models';
import { CoursesFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesService } from './courses.service';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',

})
export class CoursesComponent implements OnDestroy {
  public courses: Observable<Courses[]>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private coursesService: CoursesService,private store:Store) {
    this.coursesService.loadCourses();
    this.courses = this.coursesService.getCourses();
    this.isAdmin$=this.store.select(selectIsAdmin);
  }
  public isAdmin$:Observable<boolean>

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  onCreateCourses(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CoursesFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          if (v) {
            this.coursesService.createCourses({
              name: v.name,
              description: v.description,
            });
          }
        },
      });
  }

  onDeleteCourses(coursesToDelete: Courses): void {
    if (confirm(`¿Está seguro de eliminar a ${coursesToDelete.name}?`)) {
      this.coursesService.deleteCoursesById(coursesToDelete.id);
    }
  }

  onEditCourses(coursesToEdit: Courses): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CoursesFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: coursesToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (coursesUpdated) => {
          if (coursesUpdated) {
            this.coursesService.updateCoursesById(coursesToEdit.id, coursesUpdated);
          }
        },
      });
  }
}