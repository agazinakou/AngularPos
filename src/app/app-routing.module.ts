import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './services/authguard/auth-guard.service';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PosComponent } from './components/public/pos/pos.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
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
    path: 'admin', 
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./members/member-routing.module').then(m => m.MemberRoutingModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
