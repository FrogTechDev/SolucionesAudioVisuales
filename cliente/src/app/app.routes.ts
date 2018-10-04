import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './aplicacion/view/dashboarddemo.component';


export const routes: Routes = [
    {path: '', component: DashboardDemoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
