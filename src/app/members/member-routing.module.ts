import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/private/dashboard/dashboard/dashboard.component';
import { CategoriesComponent } from '../components/private/categories/categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from '../components/private/products/products.component';


const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent
  },
  {
    path: 'admin/products',
    component: ProductsComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MemberRoutingModule { }
