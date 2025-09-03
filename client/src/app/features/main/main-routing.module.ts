import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
    { path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        { path: 'dashboard', component: DashboardComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppMainRountingModule { }