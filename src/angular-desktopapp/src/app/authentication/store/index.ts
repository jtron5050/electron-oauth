import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const signin = createAction('[Auth] signin');
export const checkAuthComplete = createAction('[Auth] checkAuth complete', props<{ isAuthenticated: boolean }>());
export const signinComplete = createAction('[Auth] signin complete', props<{ profile: any }>());
export const signinFailed = createAction('[Auth] signin failed');

export interface User {
    id: string;
    login: string;
    name: string;
}

export interface State {
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    profile: User;
}

const initialState: State = {
    isAuthenticating: false,
    isAuthenticated: false,
    profile: null
};

export const reducer = createReducer(initialState,
    on(signin, (state) => ({ ...state, isAuthenticating: true })),
    on(signinComplete, (state, { profile }) => ({ ...state, isAuthenticated: true, isAuthenticating: false, profile: profile }))
);

const selectAuthFeature = createFeatureSelector<State>('auth');
export const selectIsAuthenticating = createSelector(selectAuthFeature, auth => auth.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectAuthFeature, auth => auth.isAuthenticated);
export const selectProfile = createSelector(selectAuthFeature, auth => auth.profile);