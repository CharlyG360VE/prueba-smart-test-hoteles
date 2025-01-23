import { ApplicationConfig, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataService } from '@/_services/data.service';
import { APP_REDUCER } from '@/_ngrx/app.reducer';
import { localStorageSync } from 'ngrx-store-localstorage'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: [
        'hotelReducer',
        'reservationReducer'
      ],
      rehydrate: true
    }
  )(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAppInitializer(() => {
      const settingsProvider = inject(DataService);

      return new Promise<void>(resolve => {
        settingsProvider
          .loadData()
          .then(() => resolve());
      });
    }),
    provideStore(APP_REDUCER, { metaReducers }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true
    }), provideAnimationsAsync()
  ]
};
