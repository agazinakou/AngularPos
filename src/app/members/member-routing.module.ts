import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/private/dashboard/dashboard/dashboard.component';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../components/shared/header/header.component';
import { FooterComponent } from '../components/shared/footer/footer.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MemberRoutingModule { }
