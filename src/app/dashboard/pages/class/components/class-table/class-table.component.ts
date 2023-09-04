import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Clase } from '../../models';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss']
})
export class ClassTableComponent {
  displayedColumns: string[] = ['id', 'Clase', 'Description', 'Actions'];

  @Input()
  dataSource: Clase[] = [];

  @Output()
  deleteClass = new EventEmitter<Clase>();

  @Output()
  editClass = new EventEmitter<Clase>();

  constructor(private store: Store){
    this.isAdmin$=this.store.select(selectIsAdmin);
  }
  public isAdmin$:Observable<boolean>;
}
