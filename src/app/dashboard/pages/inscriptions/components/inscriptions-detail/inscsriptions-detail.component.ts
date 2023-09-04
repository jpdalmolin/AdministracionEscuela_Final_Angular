import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';

import { InscriptionWithCourseAndUser } from '../../models';
import { Store } from '@ngrx/store';
import { selectInscriptions } from '../../store/inscription.selectors';

@Component({
  selector: 'app-inscriptions-detail',
  templateUrl: './inscriptions-detail.component.html',

})
export class InscriptionsDetailComponent implements OnInit{
  inscriptions$: Observable<InscriptionWithCourseAndUser[]>;


  public inscriptionId?: number;
  public selectedInscription$: Observable<InscriptionWithCourseAndUser| undefined>;


  constructor(private store: Store, private activatedRoute: ActivatedRoute, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'inscriptions']);
    } else {
      this.inscriptionId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.selectedInscription$ = this.inscriptions$.pipe(
      map((inscriptions) => inscriptions.find(inscription => inscription.id === this.inscriptionId))
    );
  };

  ngOnInit(): void {
    
    this.selectedInscription$.subscribe(() => {
     
    });
  }

  
}
