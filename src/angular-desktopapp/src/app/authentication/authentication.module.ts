import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
import { StoreModule } from '@ngrx/store';

import { SignInComponent } from './sign-in/sign-in.component';
import * as fromAuth from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

export function configureAuth(oidcConfigService: OidcConfigService) {
    return () =>
        oidcConfigService.withConfig({
            stsServer: 'https://localhost:5001',
            redirectUrl: 'x-desktopapp-oauth://signin-oidc',
            postLogoutRedirectUri: 'x-desktopapp-oauth://signout-callback-oidc',
            triggerAuthorizationResultEvent: true,
            clientId: 'desktopapp',
            scope: 'openid profile',
            responseType: 'code',
            logLevel: LogLevel.Debug,
        });
}

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        AuthModule.forRoot(),
        StoreModule.forFeature('auth', fromAuth.reducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    providers: [
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        },
    ]
})
export class AuthenticationModule { }
