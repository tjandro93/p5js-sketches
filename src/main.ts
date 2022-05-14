import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as p5 from 'p5';
import p5Svg from 'p5.js-svg';

// initialize the p5.js-SVG library as soon as the app starts
p5Svg(p5);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => {
    // tslint:disable-next-line:no-console
    return console.error(err);
  });
