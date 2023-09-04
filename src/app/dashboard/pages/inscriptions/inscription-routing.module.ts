import { CommonModule } from '@angular/common'
import { InscriptionsComponent } from './inscriptions.component'
import { InscriptionsDetailComponent } from './components/inscriptions-detail/inscsriptions-detail.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild([
            {
              // /dashboard/home
              path: '',
              component: InscriptionsComponent,
            },
            {
              path: 'inscriptions/:id',
              component: InscriptionsDetailComponent
            }
           
          ]),
    ],
    exports:[RouterModule]
})


export class InscriptionRoutingModule{}