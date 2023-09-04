import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Courses } from '../../models';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  constructor(private store:Store) {
    this.isAdmin$=this.store.select(selectIsAdmin);
  }
  public isAdmin$:Observable<boolean>
  displayedColumns: string[] = ['id', 'Curso','Descripcion', 'Actions'];

  @Input()
  dataSource: Courses[] = [];

  @Output()
  deleteCourses = new EventEmitter<Courses>();

  @Output()
  editCourses = new EventEmitter<Courses>();
}
