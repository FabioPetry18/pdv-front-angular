import { Routes } from '@angular/router';
import { ChoseThemeComponent } from './theme.component';

export const routes: Routes = [

      {
        path: '',
        component: ChoseThemeComponent,
        data: {
          title: 'routes.login'
        }
    },
];
