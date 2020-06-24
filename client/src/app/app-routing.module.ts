import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ComidaComponent } from './components/comida/comida.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';


const Routes: Routes =[
    {path: '', component: CarteleraComponent},
    {path: 'comida', component : ComidaComponent},

];

@NgModule({
    imports:[RouterModule.forRoot(Routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}