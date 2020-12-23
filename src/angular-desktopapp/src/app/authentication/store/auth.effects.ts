import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { checkAuthComplete, signin, signinComplete, signinFailed } from ".";

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
                    return this.authService.userData$.pipe(map((profile) => signinComplete({ profile })))
                }
                else {
                    return of(signinFailed());
                }
            })
        )
    );
}