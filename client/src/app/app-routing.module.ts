
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegistroComponent } from './components/registro/registro.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { ComidaComponent } from './components/comida/comida.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';

const routes : Routes = [
    //{path:'', component : },
    {path: '', component: CarteleraComponent},
    {path: 'comida', component : ComidaComponent},
    {path : 'registro', component : RegistroComponent},
    {path : 'ingreso' , component : IngresoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class  AppRoutingModule{

}

