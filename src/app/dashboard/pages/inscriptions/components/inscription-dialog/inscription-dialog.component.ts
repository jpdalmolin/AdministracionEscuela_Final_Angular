import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectCourseOptions, selectUserOptions } from '../../store/inscription.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../../courses/models';
import { Inscription } from '../../models';
import { InscriptionActions } from '../../store/inscription.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable,tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../../users/models';
import { InscriptionService } from '../../services/inscription.service';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styles: [
  ]
})
export class InscriptionDialogComponent implements OnInit {

  inscription: Inscription;
  isEditing: boolean;

    courseId = new FormControl<number | null>(null, Validators.required);
    userId= new FormControl<number | null>(null, Validators.required);

  inscriptionForm = new FormGroup({
    courseId: this.courseId,
    userId: this.userId,
  });

  userOptions$: Observable<User[]>;
  courseOptions$: Observable<Courses[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionDialogComponent>, private inscriptionService: InscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: { inscription: Inscription; isEditing: boolean }) {
    this.userOptions$ = this.store.select(selectUserOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);

    this.isEditing = data.isEditing;
    this.inscription = data.inscription || { id: 0, courseId: null, usertId: null };
 
    this.inscriptionForm.patchValue({
      courseId: this.inscription.courseId,
      userId: this.inscription.userId
    });
 
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadUserOptions());
    this.store.dispatch(InscriptionActions.loadCourseOptions());
  }

  onToggleChangeCourse(course: Courses): void {
    this.inscriptionForm.patchValue({
      courseId: course.id !== undefined ? course.id : null
    });
  }
  onToggleChangeUser(user: User): void {
    this.inscriptionForm.patchValue({
      userId: user.id !== undefined ? user.id : null
    });
  }

  get firstStepComplete(): boolean {
    return this.courseId.valid
  }

  get secondStepComplete(): boolean {
    return this.userId.valid
  }
 



  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
        const updatedInscription: Inscription = {
          ...this.inscription,
          courseId: this.inscriptionForm.get('courseId')?.value ?? 0,
          userId: this.inscriptionForm.get('userId')?.value ?? 0
        };
  
        if (this.isEditing) {
          this.inscriptionService.updateInscription(updatedInscription)
            .pipe(
              tap(() => {
                this.store.dispatch(InscriptionActions.loadUpdateInscriptionSuccess({ data: updatedInscription }));
                this.matDialogRef.close();
                
              })
            ).subscribe();
    } else {
      this.store.dispatch(InscriptionActions.createInscription({ payload: this.inscriptionForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
}