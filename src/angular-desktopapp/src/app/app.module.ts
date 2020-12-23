import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { AuthenticationModule } from './authentication/authentication.module';

import * as fromRoot from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    StoreModule.forRoot({}, { metaReducers: fromRoot.metaReducers }),
    EffectsModule.forRoot(),
    AuthenticationModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
