import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { LogsComponent } from "./components/logs/logs.component";

const routes: Routes = [
    { path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
        { path: 'Dashboard', component: DashboardComponent },
        { path: 'Profiles', component: ProfilesComponent },
        { path: 'Reports', component: ReportsComponent},
        { path: 'Logs', component: LogsComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppMainRountingModule { }