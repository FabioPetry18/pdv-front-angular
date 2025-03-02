import { Routes } from '@angular/router';
import { FirstAcessStoreComponent } from './first-acess-store.component';
export const routes: Routes = [

    {
        path: '',
        component: FirstAcessStoreComponent,
        data: {
          title: 'routes.login'
        }
    }
];
