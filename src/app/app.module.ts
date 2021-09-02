import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Component
import { LoginComponent } from './views/public/auth/login/login.component';
import { RegisterComponent } from './views/public/auth/register/register.component';
import { HomeComponent } from './views/public/home/home.component';
import { PosComponent } from './views/public/pos/pos.component';
import { DashboardComponent } from './views/private/dashboard/dashboard.component';


//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, PERSISTENCE, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

//Env
import { environment } from '../environments/environment';


import { DataTablesModule } from 'angular-datatables';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { CoreModule } from './core/core.module';
import { PrivateRoutingModule } from './views/private/private-routing.module';
import { AuthenticationService } from './core/services';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { NavbarComponent } from './core/layouts/navbar/navbar.component';
import { SidebarComponent } from './core/layouts/sidebar/sidebar.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { NgxNomadFormModule } from 'ngx-nomad-form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './views/private/categories/categories.component';
import { CategoryComponent } from './views/private/categories/category/category.component';
import { ProductComponent } from './views/private/products/product/product.component';
import { ProductsComponent } from './views/private/products/products.component';
import { SalesComponent } from './views/private/sales/sales.component';
import { InvoiceComponent } from './views/public/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PosComponent,
    DefaultLayoutComponent,
    AppLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductsComponent,
    ProductComponent,
    SalesComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    CoreModule,
    PrivateRoutingModule,
    NgxNomadFormModule.forRoot({
      env: environment
    })
  ],
  providers: [
    AngularFireAuthGuard,
    AuthenticationService,
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: PERSISTENCE, useValue: 'session' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

