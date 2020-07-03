
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegistroComponent } from './components/registro/registro.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { ComidaComponent } from './components/comida/comida.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import{ SalaComponent } from './components/sala/sala.component';
import{ UsuarioAdmComponent } from './components/usuario-adm/usuario-adm.component'
import { ChatComponent } from './components/chat/chat.component';

const routes : Routes = [
    //{path:'', component : },
    
    {path: 'comida', component : ComidaComponent},
    {path : 'registro', component : RegistroComponent},
    {path : 'ingreso' , component : IngresoComponent},
    {path : 'cartelera', component : CarteleraComponent},
    {path: 'chat', component : ChatComponent},
    {path:'sala', component : SalaComponent},
    {path: 'usuario', component : UsuarioAdmComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class  AppRoutingModule{

}

