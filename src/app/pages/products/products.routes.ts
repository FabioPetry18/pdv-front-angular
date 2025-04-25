import { Routes } from '@angular/router';
import { ProductsComponent } from './product/products.component';
import { AdditionalComponent } from './additional/additional.component';
export const routes: Routes = [

    {
        path: '',
        component: ProductsComponent,
        data: {
          title: 'routes.login'
        }
    },
    {
      path: 'additional',
      component: AdditionalComponent,
      data: {
        title: 'routes.login'
      }
    }
];
