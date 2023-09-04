import { Courses } from '../../courses/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscription } from '../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../users/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  
  getDeleteInscription(data: number): Observable<void> {
    return this.httpClient.delete<void>(environment.baseApiUrl + '/inscriptions/' + data)
  }

  updateInscription(updatedInscription: Inscription): Observable<void> {
    const { id, courseId, userId } = updatedInscription;
    const updateData = { id, courseId, userId };
    
    return this.httpClient.put<void>(`${environment.baseApiUrl}/inscriptions/${id}`, updateData);
  }
}
