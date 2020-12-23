import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from 'rxjs/operators';
import { signin, signinSucceeded } from ".";

import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}

    signin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(signin),
            switchMap(() => 
                this.authService.signin().pipe(
                    map(x => signinSucceeded({ user: x }))
                )
            )
        )
    );    
}