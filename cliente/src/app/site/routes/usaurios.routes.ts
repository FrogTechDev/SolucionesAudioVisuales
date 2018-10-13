// RouterModule
import { Routes } from '@angular/router';
import { ListComponent } from '../view/usuarios/list/list.component';
import { CreateComponent } from '../view/usuarios/create/create.component';
import { EditComponent } from '../view/usuarios/edit/edit.component';

// Declaramos la ruta principal inicio y sus rutas hijas
export const UsuariosRoute: Routes = [
    { path: 'usuario', component: ListComponent },
    { path: 'usuario/crear', component: CreateComponent },
    { path: 'usuario/:id', component: EditComponent },
];
