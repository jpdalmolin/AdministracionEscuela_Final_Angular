import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noHomeroValidator } from 'src/app/shared/utils/form-validators';
import { Courses } from '../../models';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss'],
})
export class CoursesFormDialogComponent {
  editingCourses?: Courses;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
    noHomeroValidator(),
  ]);

  descriptionControl = new FormControl<string | null>(null, [Validators.required]);


  coursesForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,

  });

  // userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Courses
  ) {
    // this.userForm = this.formBuilder.group({
    //   name: [null, [Validators.required, Validators.min(2)]],
    //   surname: [null, [Validators.required]],
    // });
    if (this.data) {
      this.editingCourses = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);

    }
  }

  onSubmit(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.coursesForm.value);
    }
  }
}