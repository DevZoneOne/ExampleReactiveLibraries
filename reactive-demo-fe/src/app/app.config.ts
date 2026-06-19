import { ApplicationConfig } from '@angular/core';

import { provideHttpClient, withXhr } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr())]
};
