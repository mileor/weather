import { enableProdMode } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLocaleData } from '@angular/common';

import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

if (environment.production) {
  enableProdMode();
}

const providers = [{ provide: LOCALE_ID, useValue: 'ru-RU' }];
platformBrowserDynamic(providers).bootstrapModule(AppModule, {
  providers
}).catch(err => console.error(err));
