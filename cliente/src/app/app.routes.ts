import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './site/view/dashboarddemo.component';
import {LoginComponent} from './site/components/login/login.component';

import {LayoutComponent} from './site/components/layout/layout.component';
import { MasterRoutes } from './site/routes/master-page.routes';

export const routes: Routes = [
    // { path: '', component: LoginComponent},
    ...MasterRoutes,
    { path: 'login', component: LoginComponent },
    // { path: 'layouts', component: LoginComponent },
    // {path: 'sample', component: SampleDemoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
