import { authFeatureKey, authReducer } from "./auth/auth.reducer";

import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "./auth/auth.reducer";

export interface AppState{
    [authFeatureKey]: AuthState,
}
export const appReducer:ActionReducerMap<AppState> ={
    [authFeatureKey]: authReducer,
}