import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  defaultUrlMatcher,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EditProductOfferComponent } from './pages/edit-product-offer/edit-product-offer.component';

const canMatchAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  //si on retourne vrai, l'utilisateur peut accéder à la route
  //si on retourne un "UrlTree" cela provoque une redirection
  return authService.isAdmin() ? true : router.createUrlTree(['login']);
};

const canMatchSeller: CanMatchFn = (route: Route, state: UrlSegment[]) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.isSeller() ? true : router.createUrlTree(['login']);
};

const canMatchSellerCreator: CanMatchFn = (
  route: Route,
  state: UrlSegment[]
) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const http: HttpClient = inject(HttpClient);

  console.log(authService.isSeller());
  console.log(authService._user.value);

  if (authService.isSeller()) {
    const matcher = route.matcher || defaultUrlMatcher;
    const matchResult = matcher(state, new UrlSegmentGroup(state, {}), route);
    const idProductOffer: string | undefined =
      matchResult?.posParams?.['id'].path;

    if (idProductOffer) {
      return http
        .get<ProductOffer>(
          'http://localhost:8080/product-offer/' + idProductOffer
        )
        .pipe(
          map((productOffer) => {
            return productOffer.seller.id == authService._user.value?.id;
          }),
          catchError((err) => {
            return of(false);
          })
        );
    }

    return router.createUrlTree(['page-not-found']);
  }

  return router.createUrlTree(['login']);
};

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'create-product',
    component: EditProductComponent,
    canMatch: [canMatchAdmin],
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canMatch: [canMatchAdmin],
  },
  {
    path: 'create-product-offer',
    component: EditProductOfferComponent,
    canMatch: [canMatchSeller],
  },
  {
    path: 'edit-product-offer/:id',
    component: EditProductOfferComponent,
    canMatch: [canMatchSellerCreator],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
