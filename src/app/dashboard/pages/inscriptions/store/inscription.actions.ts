import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Courses } from '../../courses/models';
import { CreateInscriptionPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Inscription } from '../models';
import { InscriptionWithCourseAndUser } from '../models';
import { User } from '../../users/models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription/API',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithCourseAndUser[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Courses[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load User Options': emptyProps(),
    'Load User Options Success': props<{ data: User[] }>(),
    'Load User Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Load Delete Inscription': props<{ data: number }>(),
    'Load Delete Inscription Success': props<{ data: number }>(),
    'Load Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Load Update Inscription': props<{ payload: Inscription }>(),
    'Load Update Inscription Success': props<{ data: Inscription }>(),
    'Load Update Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});
