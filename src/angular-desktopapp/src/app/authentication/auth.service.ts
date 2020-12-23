import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private electron: ElectronService,
        private ngZone: NgZone,
        private oidc: OidcSecurityService
    ) {

    }

    get token() {
        return this.oidc.getToken();
    }

    get userData$() {
        return this.oidc.userData$;
    }

    signin() {
        return new Observable<boolean>((subscriber) => {
            const options = {
                urlHandler: (url: string) => this.electron.shell.openExternal(url)
            };

            this.oidc.authorize(options);

            this.electron.ipcRenderer.once('signin-oidc', (event, args: { url: string }) => {
                this.ngZone.run(() => {
                    console.log('[SIGNIN-OIDC] Received. args=', args);
                    this.oidc.checkAuth(args.url).subscribe((isAuthorized) => {
                        subscriber.next(isAuthorized);
                        subscriber.complete();
                    });
                });
            });
        });
    }

    signout(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            const urlHandler = (url: string) => this.electron.shell.openExternal(url);

            this.oidc.logoff(urlHandler);

            this.electron.ipcRenderer.once('signout-callback-oidc', (event, args) => {
                this.ngZone.run(() => {
                    subscriber.next(true);
                    subscriber.complete();
                });
            });
        });
    }
}
