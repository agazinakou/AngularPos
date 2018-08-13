import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashComponent } from './components/dashboard/dash/dash.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { PosComponent } from './components/pos/pos.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'pos', component: PosComponent },
  { path: 'dash', component: DashComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  WelcomeComponent,
  PosComponent,
  SettingsComponent,
  DashComponent,
  LoginComponent
]
