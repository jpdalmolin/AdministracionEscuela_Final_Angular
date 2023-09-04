import { createFeature, createReducer, on } from '@ngrx/store';

import { Courses } from '../../courses/models';
import { Inscription } from '../models';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithCourseAndUser } from '../models';
import { User } from '../../users/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  data:InscriptionWithCourseAndUser[];
  userOptions:User[];
  courseOptions:Courses[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data:[],
  userOptions:[],
  courseOptions:[],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

 // load Inscriptions
 on(InscriptionActions.loadInscriptions, state => {
  return {
    ...state,
    loading: true
  }
}),


on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
  return {
    ...state,
    data: action.data,
    loading: false
  }
}),

on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  }
}),

// load User options

on(InscriptionActions.loadUserOptions, (state) => state),
on(InscriptionActions.loadUserOptionsSuccess, (state, action) => {
  return {
    ...state,
    userOptions: action.data,
  }
}),

// load Course options
on(InscriptionActions.loadCourseOptions, (state) => state),
on(InscriptionActions.loadCourseOptionsSuccess, (state, action) => {
  return {
    ...state,
    courseOptions: action.data,
  }
}),

on(InscriptionActions.loadDeleteInscription, (state, { data }) => ({
  ...state,
  data: state.data.filter(inscription => inscription.id !== data)
})),

on(InscriptionActions.loadUpdateInscriptionSuccess,(state, action) => {
  const updatedInscription = action.data;

  const updatedData = state.data.map(inscription => {
    if (inscription.id === updatedInscription.id) {
      const updatedInscriptionWithCourseAndUser: InscriptionWithCourseAndUser = {
        ...inscription,
        courseId: updatedInscription.courseId,
        userId: updatedInscription.userId
      };
      return updatedInscriptionWithCourseAndUser;
    }
    return inscription;
  });

  return {
    ...state,
    data: updatedData
  };
}),
);


export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
  
});

