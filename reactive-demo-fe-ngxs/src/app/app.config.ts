import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore([], withNgxsReduxDevtoolsPlugin(), withNgxsLoggerPlugin()),
  ],
};
