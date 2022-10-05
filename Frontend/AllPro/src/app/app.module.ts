import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ArrendarComponent } from './components/arrendar/arrendar.component';
import { VenderComponent } from './components/vender/vender.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormArrendarComponent } from './components/arrendar/form-arrendar/form-arrendar.component';
import { FormVenderComponent } from './components/vender/form-vender/form-vender.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArrendarpropiosComponent } from './components/arrendar/arrendarpropios/arrendarpropios.component';
import { VisualizacionComponent } from './components/arrendar/visualizacion/visualizacion.component';
import { AutorizarComponent } from './components/autorizar/autorizar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArrendarComponent,
    VenderComponent,
    RegisterComponent,
    WelcomeComponent,
    FormArrendarComponent,
    FormVenderComponent,
    ProfileComponent,
    UsersComponent,
    ArrendarpropiosComponent,
    VisualizacionComponent,
    AutorizarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
