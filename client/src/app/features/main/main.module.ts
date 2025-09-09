import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainCardComponent } from '../../shared/components/main-card/main-card.component';
import { AppMainRountingModule } from './main-routing.module';
import { MenuItemComponent } from '../../shared/components/ui/menu-item/menu-item.component';
import { PanelsComponent } from '../../shared/components/panels/panels.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MainLayoutComponent,
    DashboardComponent,
    MainCardComponent,
    MenuItemComponent,
    PanelsComponent,
    TableComponent,
    FormModalComponent,
    ProfilesComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AppMainRountingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
