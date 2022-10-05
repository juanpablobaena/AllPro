import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ArrendarComponent } from './components/arrendar/arrendar.component';
import { VenderComponent } from './components/vender/vender.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { FormArrendarComponent } from './components/arrendar/form-arrendar/form-arrendar.component';
import { ArrendarpropiosComponent } from './components/arrendar/arrendarpropios/arrendarpropios.component';
import { VisualizacionComponent } from './components/arrendar/visualizacion/visualizacion.component';
import { AutorizarComponent } from './components/autorizar/autorizar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'arrendamientos',
    component: ArrendarComponent
  },
  {
    path: 'ventas',
    component: VenderComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'createProperty',
    component: FormArrendarComponent
  },
  {
    path: 'misarrendamientos',
    component: ArrendarpropiosComponent
  },
  {
    path: 'visualizacion',
    component: VisualizacionComponent
  },
  {
    path: 'auth',
    component: AutorizarComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
