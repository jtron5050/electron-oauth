import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OidcSecurityService, TokenHelperService } from 'angular-auth-oidc-client';
import { AuthOptions } from 'angular-auth-oidc-client/lib/login/auth-options';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { signin } from '../store';

@Component({
    selector: 'app-sign-in',
    template: `
    <p>
      sign-in works!
    </p>

    <button (click)="login()">login</button>
  `,
    styles: [
    ]
})
export class SignInComponent implements OnInit {

    constructor(private store: Store) { }

    ngOnInit(): void {
    }

    login() {
        this.store.dispatch(signin());
    }
}