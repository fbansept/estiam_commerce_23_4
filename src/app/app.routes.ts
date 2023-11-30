import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

const canMatchAdmin: CanMatchFn = (route: Route, segment: UrlSegment[]) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  //si on retourne vrai l'utilisateur peut accéder à la route
  //si on retourne un "UrlTree" cela provoque une redirection
  return authService.isAdmin() ? true : router.createUrlTree(['login']);
};

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'create-product',
    component: EditProductComponent,
    canMatch: [canMatchAdmin],
  },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
