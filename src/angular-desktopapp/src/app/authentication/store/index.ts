import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const signin = createAction('[Auth] begin signin');
export const signinSucceeded = createAction('[Auth] signin succeeded', props<{ user: any }>());

export interface User {
    id: string;
    login: string;
    name: string;
}

export interface State {
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    currentUser: User;
}

const initialState: State = {
    isAuthenticating: false,
    isAuthenticated: false,
    currentUser: null
};

export const reducer = createReducer(initialState,
    on(signin, (state) => ({ ...state, isAuthenticating: true })),
    on(signinSucceeded, (state, { user }) => ({ ...state, isAuthenticated: true, isAuthenticating: false, currentUser: user }))
);

const selectAuthFeature = createFeatureSelector<State>('auth');
export const selectIsAuthenticating = createSelector(selectAuthFeature, auth => auth.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectAuthFeature, auth => auth.isAuthenticated);
export const selectCurrentUser = createSelector(selectAuthFeature, auth => auth.currentUser);