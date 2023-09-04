import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { Clase } from '../../models';

@Component({
  selector: 'app-class-form-dialog',
  templateUrl: './class-form-dialog.component.html',
  styleUrls: ['./class-form-dialog.component.scss'],
})
export class ClassFormDialogComponent {
  editingClass?: Clase;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);

  descriptionControl = new FormControl<string | null>(null, [Validators.required]);


  classForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,

  });

  // userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClassFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Clase
  ) {
    // this.userForm = this.formBuilder.group({
    //   name: [null, [Validators.required, Validators.min(2)]],
    //   surname: [null, [Validators.required]],
    // });
    if (this.data) {
      this.editingClass = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);

    }
  }

  onSubmit(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.classForm.value);
    }
  }
}
