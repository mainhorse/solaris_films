import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PeliculasService } from './services/peliculas.service';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavInicioComponent } from './components/nav-inicio/nav-inicio.component';
import { SliderComponent } from './components/slider/slider.component';
import { ComidaComponent } from './components/comida/comida.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { TrailerComponent } from './components/trailer/trailer.component';
import { PeliculaAdmComponent } from './components/pelicula-adm/pelicula-adm.component';
import { ComidaAdmComponent } from './components/comida-adm/comida-adm.component';
import { UsuarioAdmComponent } from './components/usuario-adm/usuario-adm.component';
import { SliderFoodComponent } from './components/slider-food/slider-food.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { SalaComponent } from './components/sala/sala.component';


@NgModule({
  declarations: [
    AppComponent,
    NavInicioComponent,
    SliderComponent,
    ComidaComponent,
    TarjetaComponent,
    FooterComponent,
    ChatComponent,
    TrailerComponent,
    PeliculaAdmComponent,
    ComidaAdmComponent,
    UsuarioAdmComponent,
    SliderFoodComponent,
    CarteleraComponent,
    SalaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PeliculasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
