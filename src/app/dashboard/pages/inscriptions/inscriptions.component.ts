import { Component, OnInit } from '@angular/core';

import { Inscription } from './models';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { InscriptionWithCourseAndUser } from './models';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/notifier/notifier.service';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { selectInscriptions } from './store/inscription.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  displayedColumns=['id','user','course','actions'];
  inscriptions$:Observable<InscriptionWithCourseAndUser[]>;
  
  constructor(private notifier:NotifierService,private store:Store, public dialog: MatDialog){
  this.inscriptions$=this.store.select(selectInscriptions)
  }
  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
    
  }
  onAdd(): void {
    this.dialog.open(InscriptionDialogComponent,{
    data: { inscription: null, isEditing: false }
  })}

  onDeleteInscription(data: number) {
    Swal.fire({
      title: `¿Estás seguro que queres eliminar esta inscripción?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(InscriptionActions.loadDeleteInscription({ data }));
        this.notifier.showSuccess('Eliminado', 'El registro ha sido eliminado correctamente');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notifier.showError('Cancelado', 'La acción ha sido cancelada');
      }
    });
  }

  onEditInscription(inscription: Inscription): void {
    const dialogRef = this.dialog.open(InscriptionDialogComponent, {
      data: { inscription, isEditing: true }
    });

    dialogRef.afterClosed().subscribe(updatedInscription => {
      if (updatedInscription) {
        this.store.dispatch(InscriptionActions.loadUpdateInscription({ payload: updatedInscription }));
      }
    });
  }
}

