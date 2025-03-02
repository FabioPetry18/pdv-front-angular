import { Routes } from '@angular/router';
import { FirstAcessComponent } from './first-acess.component';
export const routes: Routes = [

    {
        path: '',
        component: FirstAcessComponent,
        data: {
          title: 'routes.login'
        }
    }
];
