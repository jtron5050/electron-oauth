import { ActionReducer, createReducer, MetaReducer } from "@ngrx/store";


export interface AppState {

}

const initialAppState: AppState = {};

export const reducers = createReducer(initialAppState);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [debug];