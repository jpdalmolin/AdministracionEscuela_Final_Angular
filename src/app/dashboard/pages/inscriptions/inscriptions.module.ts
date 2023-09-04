import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { InscriptionEffects } from './store/inscription.effects';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsDetailComponent } from './components/inscriptions-detail/inscsriptions-detail.component';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscription.reducer';
@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionDialogComponent,
    InscriptionsTableComponent,
    InscriptionsDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionRoutingModule,
    RouterModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ],

    exports:[InscriptionsComponent],
})
export class InscriptionsModule { }
