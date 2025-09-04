import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainCardComponent } from '../../shared/components/main-card/main-card.component';
import { AppMainRountingModule } from './main-routing.module';
import { MenuItemComponent } from '../../shared/components/ui/menu-item/menu-item.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MainLayoutComponent,
    DashboardComponent,
    MainCardComponent,
    MenuItemComponent    
  ],
  imports: [
    CommonModule,
    AppMainRountingModule
  ]
})
export class MainModule { }
