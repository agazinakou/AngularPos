import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/private/dashboard/dashboard/dashboard.component';
import { CategoriesComponent } from '../components/private/categories/categories/categories.component';


const routes: Routes = [
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'admin/categories', 
    component: CategoriesComponent 
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MemberRoutingModule { }
