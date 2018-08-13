import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './components/dashboard/dash/dash.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { PosComponent } from './components/pos/pos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { SideComponent } from './components/shared/side/side.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideComponent,
    WelcomeComponent,
    PosComponent,
    DashComponent,
    SettingsComponent,
    NavComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
