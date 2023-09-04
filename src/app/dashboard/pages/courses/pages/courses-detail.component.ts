import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Courses } from '../models';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../courses.service';
import { MatIcon } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store } from '@ngrx/store';
import { User } from '../../users/models';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})

export class CoursesDetailComponent implements OnInit {

  public course?: Courses | null = null;
  public courseId?: number;


  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'courses']);
    } else {
      this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.courseDetail();
    }
  };

  ngOnInit(): void {
    this.courseDetail();
    
  };


  courseDetail(): void {
    if (this.courseId) {
      this.coursesService.getCoursesById(this.courseId).subscribe({
        next: (course) => {
          this.course= course;
        }
      })
    }
  };
    
}