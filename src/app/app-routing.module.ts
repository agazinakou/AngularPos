import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './views/public/home/home.component';
import { PosComponent } from './views/public/pos/pos.component';
import { LoginComponent } from './views/public/auth/login/login.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { InvoiceComponent } from './views/public/invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'pos',
        component: PosComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: AppLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./views/private/private-routing.module').then(m => m.PrivateRoutingModule)
  },
  { path: "**", redirectTo: "/home" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
