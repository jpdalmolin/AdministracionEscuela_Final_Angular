import * as fromInscription from './inscription.reducer'

import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectInscriptionState=createFeatureSelector<fromInscription.State>(
    fromInscription.inscriptionsFeatureKey


);

export const selectInscriptions=createSelector(selectInscriptionState,(state)=>state.data)

export const selectUserOptions = createSelector(selectInscriptionState, (state) => state.userOptions)
export const selectCourseOptions = createSelector(selectInscriptionState, (state) => state.courseOptions)