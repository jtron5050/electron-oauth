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

    signin() {
        return new Observable((subscriber) => {
            const options = {
                urlHandler: (url: string) => this.electron.shell.openExternal(url)
            };

            this.oidc.authorize(options);

            this.electron.ipcRenderer.once('signin-oidc', (event, args: { url: string }) => {
                this.ngZone.run(() => {
                    console.log('[SIGNIN-OIDC] Received. args=', args);
                    this.oidc.checkAuth(args.url).subscribe();
                    subscriber.next(true);
                    subscriber.complete();
                });
            });
        }).pipe(switchMap(x => this.oidc.userData$))
    }
}
