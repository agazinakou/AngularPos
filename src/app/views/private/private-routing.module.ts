import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CoreModule } from 'src/app/core/core.module';
import { SalesComponent } from './sales/sales.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'sales',
    component: SalesComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class PrivateRoutingModule { }
