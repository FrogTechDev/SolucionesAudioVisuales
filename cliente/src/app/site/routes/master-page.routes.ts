// RouterModule
import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardDemoComponent } from '../view/dashboarddemo.component';
import { AuthGuard } from '../service/auth.guard';
import { UsuariosRoute } from './usaurios.routes';

// Declaramos la ruta principal inicio y sus rutas hijas
export const MasterRoutes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        ...UsuariosRoute,
       { path: 'inicio', component: DashboardDemoComponent }
    ]
  }
];
