import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Component
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/public/home/home.component';
import { PosComponent } from './components/public/pos/pos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './components/private/dashboard/dashboard/dashboard.component';

//Services
import { AuthGuardService } from './services/authguard/auth-guard.service';
import { AuthenticationService } from './services/authentication/authentication.service';

//AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

//Env
import { environment } from '../environments/environment';
import { MemberRoutingModule } from './members/member-routing.module';


import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PosComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    MemberRoutingModule,
    DataTablesModule
  ],
  providers: [
    AngularFireAuthGuard,
    AuthGuardService,
    AuthenticationService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
