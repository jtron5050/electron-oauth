import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { appStarted } from './store/actions';

import * as fromAuth from './authentication/store';

@Component({
    selector: 'app-root',
    template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
    </div>
    <div>
        <p>Authenticating: {{isAuthenticating$ | async}}</p>
        <p>Authenticated: {{isAuthenticated$ | async}}</p>
        <p>{{userData$ | async | json}}</p>
    </div>
    <div><a routerLink="home">Home</a> | <a routerLink="signin">Signin</a></div>

    <router-outlet></router-outlet>
    `,
    styles: []
})
export class AppComponent {
    title = 'angular-desktopapp';
    isAuthenticating$: Observable<boolean>;
    isAuthenticated$: Observable<boolean>;
    userData$: Observable<any>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.isAuthenticating$ = this.store.pipe(select(fromAuth.selectIsAuthenticating));
        this.isAuthenticated$ = this.store.pipe(select(fromAuth.selectIsAuthenticated));
        this.userData$ = this.store.pipe(select(fromAuth.selectProfile));
        this.store.dispatch(appStarted());
    }
}
