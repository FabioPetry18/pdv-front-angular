import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {  SampleInterceptor } from './utils/interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),  
    provideAnimations(),
    provideToastr({ 
      positionClass: 'toast-top-right', 
      timeOut: 3000,
      progressBar: true, 
      preventDuplicates: true
    }),
    {
        provide:HTTP_INTERCEPTORS,
        useClass:SampleInterceptor,
        multi:true
    }
  ]
};
