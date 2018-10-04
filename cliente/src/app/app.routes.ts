import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';


export const routes: Routes = [
    {path: '', component: DashboardDemoComponent},
    // {path: 'sample', component: SampleDemoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
