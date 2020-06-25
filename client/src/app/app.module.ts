import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { PeliculasService } from './services/peliculas.service';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

//Inicio Service
import { CargarScriptService } from './services/cargarScript.service';

import { AppComponent } from './app.component';
import { NavInicioComponent } from './components/nav-inicio/nav-inicio.component';
import { SliderComponent } from './components/slider/slider.component';
import { ComidaComponent } from './components/comida/comida.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { TrailerComponent } from './components/trailer/trailer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavInicioComponent,
    SliderComponent,
    ComidaComponent,
    TarjetaComponent,
    FooterComponent,
    ChatComponent,
    TrailerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PeliculasService,
    CargarScriptService],

  bootstrap: [AppComponent]
})
export class AppModule { }
