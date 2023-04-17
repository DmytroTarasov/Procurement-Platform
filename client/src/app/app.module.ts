import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { SharedModule } from './shared/shared.module';
import { DialogEffects } from './store/effects/dialog.effects';
import { RouteEffects } from './store/effects/route.effects';
import { RequestsEffects } from './requests/store/requests.effects';
import { OrdersEffects } from './orders/store/orders.effects';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import localeUk from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, DialogEffects, RouteEffects, RequestsEffects, OrdersEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeUk)
  }
}
