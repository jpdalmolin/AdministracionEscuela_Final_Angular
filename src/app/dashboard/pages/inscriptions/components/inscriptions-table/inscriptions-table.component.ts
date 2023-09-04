import { Component } from '@angular/core';
import { Inscription } from '../../models';
import { InscriptionActions } from '../../store/inscription.actions';
import { InscriptionDialogComponent } from '../inscription-dialog/inscription-dialog.component';
import { InscriptionWithCourseAndUser } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/notifier/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { selectInscriptions } from '../../store/inscription.selectors';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',

})
export class InscriptionsTableComponent {
  displayedColumns: string[] = ['icon', 'name','course', 'user', 'actions'];
  inscriptions$: Observable<InscriptionWithCourseAndUser[]>

  constructor(private store: Store, private notifier: NotifierService, public dialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectInscriptions)
  }

 
}
