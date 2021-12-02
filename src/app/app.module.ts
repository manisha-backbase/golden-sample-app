import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authConfig, environment } from '../environments/environment';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';
import { IconModule } from '@backbase/ui-ang/icon';
import { LayoutModule } from '@backbase/ui-ang/layout';
import { LogoModule } from '@backbase/ui-ang/logo';
import { AvatarModule } from '@backbase/ui-ang/avatar';
import { CONDITIONS } from '@backbase/foundation-ang/web-sdk';
import { triplets } from './services/entitlementsTriplets';
import { LocaleSelectorModule } from './locale-selector/locale-selector.module';

const buildEntitlementsByUser =
  (userPermissions: Record<string, boolean>): (triplet: string) =>
    Promise<boolean> => (triplet: string) => new Promise((resolve) => {
      Object.keys(userPermissions).forEach((key) => {
        if (triplet === key) {
          resolve(userPermissions[key]);
        }
      });
    });
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EntitlementsModule,
    DropdownMenuModule,
    IconModule,
    LayoutModule,
    LogoModule,
    NgbDropdownModule,
    AvatarModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    OAuthModule.forRoot(),
    LocaleSelectorModule.forRoot({
      locales: environment.locales,
    }),
  ],
  providers: [
    ...environment.mockProviders,
    AuthGuard,
    { provide: AuthConfig, useValue: authConfig },
    {
      provide: OAuthModuleConfig,
      useValue: {
        resourceServer: {
          allowedUrls: [ environment.apiRoot ],
          sendAccessToken: true,
        },
      },
    },
    { provide: OAuthStorage, useFactory: () => localStorage },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ OAuthService ],
      useFactory: (oAuthService: OAuthService) => () => {
        return oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
          return oAuthService.setupAutomaticSilentRefresh();
        });
      }
    },
    {
      provide: CONDITIONS,
      useFactory: () => ({
        resolveEntitlements(triplet: string) {
          return buildEntitlementsByUser({
            [triplets.canMakeLimitlessAmountTransfer]: true,
            [triplets.canViewTransactions]: true,
            [triplets.canViewTransfer]: true,
          })(triplet);
        },
      }),
      deps: []
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
