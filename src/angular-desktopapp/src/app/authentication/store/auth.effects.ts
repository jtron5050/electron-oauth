import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, take, tap } from 'rxjs/operators';
import { checkAuthComplete, signin, signinComplete, signinFailed, signout, signoutComplete } from ".";

import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}

    signin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(signin),
            switchMap(() => 
                this.authService.signin().pipe(
                    map(isAuthenticated => checkAuthComplete({ isAuthenticated }))
                )
            )
        )
    );
    
    checkAuthComplete$ = createEffect(() => 
        this.actions$.pipe(
            ofType(checkAuthComplete),
            switchMap((isAuthenticated) => {
                if (isAuthenticated) {
                    return this.authService.userData$.pipe(
                        take(1), 
                        map((profile) => signinComplete({ profile }))
                    )
                }
                else {
                    return of(signinFailed());
                }
            })
        )
    );

    signout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signout),
            switchMap(() => 
                this.authService.signout().pipe(
                    map(() => signoutComplete())
                )
            )
        )
    )
}