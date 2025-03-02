import { Routes } from '@angular/router';
import { OrderNewComponent } from './new/order.component';

export const routes: Routes = [

    {
      path: '',
      redirectTo: 'new',  
      pathMatch: 'full' 
    },
    {
        path: 'new',
        component: OrderNewComponent,
        data: {
          title: 'routes.login'
        }
    },
];
