import { Routes } from '@angular/router';
import { CadastroProprietarioComponent } from './pages/cadastro-proprietario/cadastro-proprietario.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/layoutWithSideBar';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full' 
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        data: {
          title: 'routes.login'
        }
    },
    {
        path: 'pedido',
        component: MainLayoutComponent,
        loadChildren: () => import('./pages/order/order.routes').then(r => r.routes)
    },
    {
        path: 'products',
        component: MainLayoutComponent,
        loadChildren: () => import('./pages/products/products.routes').then(r => r.routes)
    },
    {
        path: 'theme',
        loadChildren: () => import('./pages/theme/theme.routes').then(r => r.routes)
    },
    {
        path: 'first-acess',
        loadChildren: () => import('./pages/first-acess/first-acess.routes').then(r => r.routes)
    },
    {
        path: 'first-acess-store',
        loadChildren: () => import('./pages/first-acess-new-store/first-acess-store.routes').then(r => r.routes)
    },
    {
        path: 'cadastro-proprietario',
        component: CadastroProprietarioComponent
    }
];
