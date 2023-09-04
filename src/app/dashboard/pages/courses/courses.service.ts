import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { Courses, CreateCoursesData, UpdateCoursesData } from './models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'src/app/core/notifier/notifier.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadCourses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Courses[]>(environment.baseApiUrl + '/courses')
      
    .subscribe({
      next: (response) => {
        // SI TODO SALE OK...
        this._courses$.next(response);
      },
      error: () => {
      
        this.notifier.showError('Error al cargar los usuarios');
      },
      complete: () => {
        this._isLoading$.next(false);
        
      },
    })
  }

  getCourses(): Observable<Courses[]> {
    return this.courses$;
  }

  getCoursesById(id: number) {
    return this.courses$.pipe(
      take(1),
      map(( courses) =>  courses.find((u) => u.id === id)),
    )
  }

  createCourses(payload: CreateCoursesData): void {
    this.httpClient.post<Courses>(environment.baseApiUrl  + '/courses', { ...payload})
    .pipe(
      mergeMap((coursesCreate) => this.courses$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, coursesCreate])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._courses$.next(arrayActualizado);
      }
    })
  }

  updateCoursesById(id: number, coursesActualizado: UpdateCoursesData): void {
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, coursesActualizado)
    .subscribe({
      next: () => this.loadCourses(),
    })
  }

  deleteCoursesById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
    .pipe(
      ).subscribe({
        next: (arrayActualizado) => this.loadCourses(),
      })
  }
}