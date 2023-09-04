import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { Clase, CreateClassData, UpdateClassData } from './models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'src/app/core/notifier/notifier.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private _clase$ = new BehaviorSubject<Clase[]>([]);
  private clase$ = this._clase$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadClasses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Clase[]>(environment.baseApiUrl + '/class')
      
    .subscribe({
      next: (response) => {
        // SI TODO SALE OK...
        this._clase$.next(response);
      },
      error: () => {
      
        this.notifier.showError('Error al cargar los usuarios');
      },
      complete: () => {
        this._isLoading$.next(false);
        
      },
    })
  }

  getClasses(): Observable<Clase[]> {
    return this.clase$;
  }

  getClassById(id: number) {
    return this.clase$.pipe(
      take(1),
      map(( classes) =>  classes.find((u) => u.id === id)),
    )
  }

  createClass(payload: CreateClassData): void {
    // TAKE 1 = solo quiero recibir una emision
    this.httpClient.post<Clase>(environment.baseApiUrl  + '/class', { ...payload})
    .pipe(
      mergeMap((classCreate) => this.clase$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, classCreate])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._clase$.next(arrayActualizado);
      }
    })
  }

  updateClassById(id: number, claseActualizada: UpdateClassData): void {
    this.httpClient.put(environment.baseApiUrl + '/class/' + id, claseActualizada)
    .subscribe({
      next: () => this.loadClasses(),
    })
  }

  deleteClassById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/class/' + id)
    .pipe(
      ).subscribe({
        next: (arrayActualizado) => this.loadClasses(),
      })
  }
}
