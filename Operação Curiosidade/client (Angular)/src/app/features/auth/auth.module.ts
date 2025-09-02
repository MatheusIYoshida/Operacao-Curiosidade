import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './auth-routing.module';

import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { LogoCircleComponent } from '../../shared/components/ui/logo-circle/logo-circle.component';
import { AuthCardComponent } from '../../shared/components/auth-card/auth-card.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoBackArrowComponent } from '../../shared/components/ui/go-back-arrow/go-back-arrow.component';
import { FormsAlertComponent } from '../../shared/components/ui/forms-alert/forms-alert.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    LogoCircleComponent,
    AuthCardComponent,
    LoginComponent,
    RegisterComponent,
    GoBackArrowComponent,
    FormsAlertComponent    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
